import React, {useEffect, useState} from "react"
import { faTimes, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from 'react-router';
import styled, {css} from 'styled-components';
import media from 'styled-media-query';
import UserIcon from './UserIcon';
import { signinAction,
         signinModalOnAction,
         signoutAction,
         signupModalOnAction } from "../store/actions";

import { useDispatch, useSelector } from "react-redux";
import userApi from '../api/users'

export const HeaderStyle = styled.header`
  background-color: var(--color-mainviolet--100);
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  width: 100%;
  border-bottom: 1px solid var(--color-lightgray);
  z-index: 10;

  ${media.lessThan("medium")`
    padding: 1rem;
  `}
`


const Navs = styled.nav`
  display: flex;
  flex: 1;

  ${media.lessThan("medium")`
    display: ${({isNav}) => (isNav ? 'flex' : 'none')}
    flex-direction: column;
    position: fixed;
    top: 4rem;
    left: 0;
    height: 0;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh,1vh) * 100);
    padding: 1rem;
    background-color: var(--color-mainviolet--50);
    border-top: 1px solid var(--color-mainviolet--50);
  `}
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

const NavbarTitle = styled.div`
    color: white; 
    text-decoration: none;
    margin-left: 1px;
`

const LogoLink = styled(Link)`
  margin-right: 1rem;
  height:auto;
`;

const NavTitleImg = styled.img`
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

const NavShortImg = styled.img`
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


const StyleNavLink = styled(NavLink)`
  border: 2px solid var(--color-darkwhite);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 13rem;
  margin: 0 1rem;
  width: 8.1rem;
  height: 3rem;
  transition: background-color, color 100ms ease-out;
  color: var(--color-darkwhite);

  :hover{
    color: var(--color-darkwhite);
  }

  ${media.lessThan("medium")`
    padding: 1rem;
    font-size: 1.68rem;
    margin-right: 0;
    border: none;
  `}

  &.active{
    background-color: var(--color-mainviolet--75);
    color: var(--color-black);
  }
`

const MobileStyleNavLink = styled(StyleNavLink)`
  display: flex;

  ${media.lessThan("medium")`
    display:none;
  `}
`

const MobileStyledH4 = styled.h4`
  display: block;
  padding-left: 1rem;
  color: var(--color-gray);
  margin-bottom: 1rem;
  &:last-of-type {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-lightgray);
  }
  ${media.greaterThan("medium")`
    display: none;
  `}
`;

const MobileUserContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-darkwhite);
  border-radius: 0.5rem;
  font-size: 1.3rem;
  align-items: center;
  margin-bottom: 1rem;

  ${media.greaterThan("medium")`
      display: none;
    `}
`;

const MobileNavBtn = styled.button`
  display:flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.68rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  color: var(--color-red);
  border: 1px solid var(--color-red);

  ${media.greaterThan("medium")`
    display:none;
    `}
`;

const MobileHambergerBtn = styled.button`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  margin-left: 0.5rem;

  ${media.greaterThan("medium")`
    display:none;
  `}
`

const LoginBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:1.8rem;
`

const SignupBtn = styled.button`
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

const ModalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 2;
`

const UserBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 2;
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 2;
`

const CommunityBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:30px;
  margin: 0 1rem;
  width: 8rem;
  height: 3rem;
`

const RoomBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:30px;
  margin: 0 1rem;
  width: 8rem;
  height: 3rem;
`;

const LoginModalBackdrop = styled.div`
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

const SignUpModalBackdrop = styled.div`
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


const CloseBtn = styled.span`
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

const Text = styled.span`
  font-size: 2rem;
  line-height: 1;
  color: var(--color-darkwhite);
  ${media.lessThan("medium")`
    margin-left: 0.96rem;
    font-size: 1.2rem;
  `}
`;


const UserImg = styled.img`
  border: 1px solid gray;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  object-fit: fill;

`
const UserName = styled.span`
  font-size: 20px;
  color: white;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;
`

const PcUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: calc (-4.5rem - 3px);
  right: 0;
  border-radius: 0.5rem;
  border: 1px solid var(--color-lightgray);
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

  const [isUserBtnClicked, setIsUserBtnClicked] = useState(false);
  const [isHambugBtnClicked, setIsHambugBtnClicked] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const {id, username, user_image, isLogin} = useSelector(({authReducer})=> authReducer);
  

  const handleUserInfoClick = () => {
    setIsUserBtnClicked((prev) => !prev);
    setIsHambugBtnClicked(false);
  }

  const closeAll = () => {
    setIsUserBtnClicked(false);
    setIsHambugBtnClicked(false);
  }

  const handleSignOut = async() => {
    closeAll();
    console.log(document.cookie);
    const cookies = document.cookie;
    console.log(cookies);
    const storageKey = document.cookie.split('; ')
            .find(row => row.startsWith('accessToken'))
            .split('=')[1]
    const res = await userApi.logoutApi();
    if(res.status === 200) {
      localStorage.removeItem(storageKey)
      dispatch(signoutAction());
      history.push("/")
    }
  };


  return (
      <HeaderStyle>
            <NavbarTitle onClick={() => window.location.assign('http://localhost:3000')}>
              <NavTitleImg 
                src='img/WalkingDogsTitleLogo.jpeg'
                alt='WalkingDogsTitleLogo'
                isLogin={isLogin}/>
              <NavShortImg 
              src='img/WalkingDogsShort.jpeg'
              alt='WalkingDogsShort'
              isLogin={isLogin}
              />
            </NavbarTitle>

        {isLogin && (
              <Navs isNav={isHambugBtnClicked}>
                <MobileUserContainer>
                  <UserIcon size={1.2} user={{id, username, user_image}} isDisabled/>
                </MobileUserContainer>  
                <MobileStyledH4> Page</MobileStyledH4>
                <StyleNavLink to='/roomlist' onClick={closeAll}>
                  <Text> 모임 </Text>
                </StyleNavLink>
                <StyleNavLink to='/community' onClick={closeAll}>
                  <Text>커뮤니티</Text>
                </StyleNavLink>
                <MobileStyledH4> Account </MobileStyledH4>
                  <MobileNavBtn onClick={handleSignOut}>
                    <Text>로그아웃</Text>
                  </MobileNavBtn>
              </Navs>
          )}

        {!isLogin && (
          <ModalContainer>
            <LoginBtn 
            className='nav-btn' 
            onClick={()=>dispatch(signinModalOnAction())}> 
              로그인
            </LoginBtn>

            <SignupBtn 
            className='nav-btn' 
            onClick={()=>dispatch(signupModalOnAction())}>
              회원가입
            </SignupBtn>
          </ModalContainer>
        )}

        {isLogin && (
          <UserBox>
            {console.log(user_image)}
            <UserName onClick={() => history.push('/mypage')}>{username}</UserName>
              <UserImg src={user_image} onClick={() => history.push('/mypage')}/>
            <LogoutBtn onClick={handleSignOut}>로그아웃</LogoutBtn>
          </UserBox>
        )}

        {isUserBtnClicked && (
          <PcUserInfo>
             <PcUserInfoMyPageBtn to='/mypage' onClick={handleUserInfoClick}> 마이 페이지 </PcUserInfoMyPageBtn>
             <PcUserInfoLogoutBtn onClick={handleSignOut}> 로그아웃 </PcUserInfoLogoutBtn>
           </PcUserInfo>
         )}

      </HeaderStyle>


  );
}

export default Nav;
