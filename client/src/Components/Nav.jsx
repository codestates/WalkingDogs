import React, {useEffect, useState} from "react"
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import Mypage from '../Pages/Mypage';
import styled,{css} from 'styled-components';
import media from 'styled-media-query';
import UserIcon from './UserIcon';
import { signinAction,
         signinModalOnAction,
         signoutAction,
         signupModalOnAction } from "../store/actions";

import { useDispatch, useSelector } from "react-redux";
import userApi from '../api/users'


export const HeaderStyle = styled.header`
  background-color: #646fcb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
`


export const NavContainer = styled.nav`
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    background-color: #646fcb;
    padding: 1rem 0.5rem;
    ${media.lessThan("medium")`
      padding: 1rem;
    `}
` 

export const NavbarTitle = styled.div`
    color: white; 
    text-decoration: none;
    margin-left: 1px;
`

export const NavLink = styled(Link)`
  margin-right: 1rem;
  height:1rem;
`;

export const NavTitleImg = styled.img`
  margin-right: 1rem;
  display:block;
  object-fit: scale-down;

  ${({isLogin}) => 
    !isLogin && 
    css`
      ${media.lessThan("medium")`
        display: block;
      `}
    `}
`;

export const NavShortImg = styled.img`
margin-right: 1rem;
display:none;
object-fit: scale-down;

${({isLogin}) => 
  !isLogin && 
  css`
    ${media.lessThan("small")`
      display: block;
    `}
  `}
`;



export const LoginBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:1.8rem;
`

export const SignupBtn = styled.button`
    border: 0.1rem solid white;
    background-color: white;
    color: #646fcb;
    border-radius: 10px;
    cursor: pointer;
    font-size:1.8rem;
    margin: 0 1.1rem;
`

const LogoutBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:1.8rem;
`

export const ModalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 2;
`

export const UserBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 2;
`

export const CommunityContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 2;
`

export const CommunityBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:30px;
  margin: 0 2rem;
`

export const LoginModalBackdrop = styled.div`
  position:  fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.9);
  display: grid;
  place-items: center;
`;

export const SignUpModalBackdrop = styled.div`
  position:  fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.9);
  display: grid;
  place-items: center;
`;


export const CloseBtn = styled.span`
  background-color: #000000;
  width:35px;
  border-radius: 50px;
  border: none;
  font-size: 30px;
  margin: 1px 20px 8px 440px;
  cursor: pointer;
  color: white;

&:hover {
  box-shadow: gray 2px 2px 2px;
}
`;


export const ModalTitleBox = styled.div`
  width: auto;
  height: auto;
`

export const TitleImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`

export const UserImg = styled.img`
  border: 1px solid gray;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  object-fit: fill;

`

export const UserName = styled.span`
  font-size: 20px;
  color: white;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;
`

const InputContainer = styled.div`
  height: auto;
  flex-direction: column;
`;


const Input = styled.input`
  height: 2rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--color-black);
  &:focus{
    outline: 1px solid #ffffff;
    border: hidden;
  }
  ::placeholder {
    color: gray;
  }
`;

const PWInput = styled.input.attrs({type: 'password'})`
  height: 2rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: black;
  ::placeholder {
    color: gray;
  }
`;

const PcUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: calc (-4.5rem - 3px);
  right: 0;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  ${media.lessThan("medium")`
    display: none;
  `};
`;

const PcUserInfoMyPageBtn = styled(Link)`
  background-color: var(--color-white);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border-bottom: 1px solid var(--color-lightgray);
  transition: background-color 100ms ease-out;
  :hover {
    background-color: var(--color-darkwhite);
  }
`;

const PcUserInfoLogoutBtn = styled.button`
  color: var(--color-red);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--color-white);
  transition: background-color 100ms ease-out;
  :hover {
    background-color: var(--color-red--25);
  }
`;


// styled-component Boundary

function Nav() {

  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isUserBtnClicked, setIsUserBtnClicked] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const {id, username, image, isLogin} = useSelector(({authReducer})=> authReducer);
  

  const handleUserInfoClick = () => {
    setIsUserBtnClicked((prev) => !prev);
  }

  const closeAll = () => {
    setIsUserBtnClicked(false);
  }

  const handleSignOut = () => {
    closeAll();
      const res = userApi.logoutApi();
        dispatch(signoutAction());
      if(res.status === 200) history.push("/")
  };


  return (
    <NavContainer>
      <NavbarTitle>
          <NavLink to='/'>
            <NavTitleImg 
              src='img/WalkingDogsTitleLogo.jpeg'
              alt='WalkingDogsTitleLogo'
              isLogin={isLogin}/>
            <NavShortImg 
            src='img/WalkingDogsShort.jpeg'
            alt='WalkingDogsShort'
            isLogin={isLogin}
            />
          </NavLink>
      </NavbarTitle>

      <CommunityContainer>
        <Link to="community">
            <CommunityBtn> 커뮤니티 </CommunityBtn>
        </Link>
      </CommunityContainer>

      {!isLogin && (
        <ModalContainer>
            <LoginBtn className='nav-btn' onClick={()=>dispatch(signinModalOnAction())}> 
              로그인 
            </LoginBtn>
            <SignupBtn className='nav-btn' onClick={()=>dispatch(signupModalOnAction())}>
            회원가입 
            </SignupBtn>
        </ModalContainer>
      )}

      {isLogin && (
        <UserBox>
          <UserName onClick={() => history.push('/mypage')}>{username}</UserName>
          <UserImg src='img/puppy-test.jpeg' onClick={() => history.push('/mypage')}/>
          <LogoutBtn onClick={handleSignOut}>로그아웃</LogoutBtn>
        </UserBox>
        )}

        {isUserBtnClicked && (
          <PcUserInfo>
            <PcUserInfoMyPageBtn to='/mypage' onClick={handleUserInfoClick}> 마이 페이지 </PcUserInfoMyPageBtn>
            <PcUserInfoLogoutBtn onClick={handleSignOut}> 로그아웃 </PcUserInfoLogoutBtn>
          </PcUserInfo>
        )}
    </NavContainer>
  );
}

export default Nav;
