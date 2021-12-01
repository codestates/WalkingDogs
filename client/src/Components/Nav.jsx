import React, {useEffect, useState} from "react"
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Mypage from '../Pages/Mypage'
import styled from 'styled-components'

export const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #646fcb;
    padding: 7px 20px;
` 

export const NavbarTitle = styled.div`
    color: white; 
    font-size: 35px;
    text-decoration: none;
    margin-left: 10px;
    font-family: "Playfair Display", serif;
    font-family: "Rammetto One", cursive;
`

export const LoginModalBtn = styled.button`
  border: 0.5px solid white;
  background-color: #5156bf;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:30px;
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

export const LoginModalView = styled.div.attrs({role: 'dialog'})`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: #646fcb;
  width: 30rem;
  height: 40rem;

  > div.close.btn {
   margin-top: 15px;
   cursor: pointer;
 }
 
  > div.desc{
   margin-top: 25px;
   color: #646fcb;
 }
 `

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
`;


const Input = styled.input`
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

function Nav({ isLogin, setIsLogin, isUser, setIsUser }) {

  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  
  const openSignupHandeler = () => {
    setIsSignUpOpen(!isSignUpOpen);
  }
  


  return (
    <NavbarContainer>
      <NavbarTitle>
        <div className='nav_logo'>
          <img src='./logo.ico'
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover'
            }} />
          <Link to="/"
            style={{
              color: '#ffffff',
              fontSize: '40px',
              textDecoration: 'none',
              fontFamily: 'Rammetto One',
              marginLeft: '10px'
            }}>
            WalkingDogs
          </Link>
        </div>
      </NavbarTitle>

      <CommunityContainer>
        <Link to="community">
            <CommunityBtn> 커뮤니티 </CommunityBtn>
        </Link>
      </CommunityContainer>

      <ModalContainer>
        {isLogin ? (
          '') : (
          <LoginModalBtn onClick={openModalHandler}> 로그인 </LoginModalBtn>
        )}
        {isOpen === true ? (
          <LoginModalBackdrop onClick={openModalHandler}>
              <LoginModalView onClick={(e)=> e.stopPropagation()}>
                <CloseBtn onClick={openModalHandler}>
                  <FontAwesomeIcon icon={faTimes}/>
                </CloseBtn>
                  <ModalTitleBox>
                    <TitleImg src='img/WalkingDogsTitleLogo.jpeg'/>
                  </ModalTitleBox>
                <InputContainer>
                  <Input name='email' placeholder='이메일'></Input>
                </InputContainer>
              </LoginModalView>

          </LoginModalBackdrop>
        ) : (null)}

          {isUser ? '' : <SignupBtn onClick={openSignupHandeler}> 회원가입 </SignupBtn>}
          {isSignUpOpen === true ? (
            <SignUpModalBackdrop>
                <SignupModalView onClick={(e)=> e.stopPropagation()}>
                  <CloseBtn onClick={openSignupHandeler}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </CloseBtn>
                </SignupModalView>
            </SignUpModalBackdrop> 
          ) : (null)}
      </ModalContainer>
 
        <Link to="/mypage" className="mypage_icon" render={(props) => <Mypage />}>
          <UserImg src='img/puppy-test.jpeg' />
        </Link>      
    </NavbarContainer>
  );
}

export default Nav;
