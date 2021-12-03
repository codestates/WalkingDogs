import React, {useEffect, useState} from "react"
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router'
import Mypage from '../Pages/Mypage'
import styled,{css} from 'styled-components'
import media from 'styled-media-query';
import { signinAction,
         signinModalOnAction,
         signupAction,
         signupModalOnAction } from "../store/actions";

import { useDispatch, useSelector } from "react-redux";


export const HeaderStyle = styled.header`
  background-color: #646fcb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
`


export const NavContainer = styled.nav`
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
  background-color: #5156bf;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:2.4rem;
`

export const SignupBtn = styled.button`
    border: 1px solid #646fcb;
    background-color: white;
    color: #646fcb;
    border-radius: 10px;
    cursor: pointer;
    font-size:30px;
    margin: 0 1.1rem;
`

export const ModalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 2;
`

export const userBox = styled.div`
  display: flex;
  justify-content: flex-end;
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


export const SignupModalView = styled.div.attrs({role: 'dialog'})`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  width: 30rem;
  height: 40rem;

> div.close.btn {
 margin-top: 15px;
 cursor: pointer;
}

> div.desc{
 margin-top: 25px;
 color: #5156bf;
}
`

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
    color: var(--color-gray);
  }
`;

const PWInput = styled.input.attrs({type: 'password'})`
  height: 2rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--color-black);
  ::placeholder {
    color: var(--color-gray);
  }
`;

// const Button = styled(Btn)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 0;
//   min-height: 3rem;
//   font-size: 1rem;
//   border: 1.5px solid var(--color-maingreen--100);
//   * {
//     font-size: 0.5rem;
//   }
// `;

// styled-component Boundary

function Nav({ }) {

  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const {id, username, image, isLogin} = useSelector(({authReducer})=> authReducer);
  


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
        <userBox>
          <UserImg src='img/puppy-test.jpeg' />
        </userBox>
        )}

      {/* <CommunityContainer>
        <Link to="community">
            <CommunityBtn> 커뮤니티 </CommunityBtn>
        </Link>
      </CommunityContainer>

      <ModalContainer>
        
          <LoginModalBtn > 로그인 </LoginModalBtn>
        
        
          <LoginModalBackdrop >
              <LoginModalView >
                <CloseBtn>
                  <FontAwesomeIcon icon={faTimes}/>
                </CloseBtn>
                  <ModalTitleBox>
                    <TitleImg src='img/WalkingDogsTitleLogo.jpeg'/>
                  </ModalTitleBox>
                <InputContainer>
                  <Input name='email' placeholder='이메일'></Input>
                  <PWInput name='password' placeholder='비밀번호'></PWInput>
                </InputContainer>
              </LoginModalView>

          </LoginModalBackdrop>
        

          <SignupBtn > 회원가입 </SignupBtn>
          
            <SignUpModalBackdrop>
                <SignupModalView onClick={(e)=> e.stopPropagation()}>
                  <CloseBtn >
                    <FontAwesomeIcon icon={faTimes}/>
                  </CloseBtn>
                </SignupModalView>
            </SignUpModalBackdrop> 
          
      </ModalContainer>
 
        <Link to="/mypage" className="mypage_icon" render={(props) => <Mypage />}>
          <UserImg src='img/puppy-test.jpeg' />
        </Link>       */}
    </NavContainer>
  );
}

export default Nav;
