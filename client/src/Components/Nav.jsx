import React, { useState, useEffect } from "react"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import UserIcon from './UserIcon';
import { signinModalOnAction,
         signoutAction,
         signupModalOnAction } from "../store/actions";

import { useDispatch, useSelector } from "react-redux";
import user from '../api/users';
import {gsap} from "gsap";




const HeaderStyle = styled.header`
  background-color: var(--color-mainviolet--100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  width: auto;
  z-index: 10;
  ${media.lessThan("medium")`
    padding: 1rem;
  `}
`


const Navs = styled.nav`
  display: flex;
  flex: 1;
  justify-content: space-evenly;

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
`;

const NavbarTitle = styled.div`
    color: white; 
    text-decoration: none;
    margin-left: 1px;
`

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
height: 2rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-right: 0.5rem;
  padding:0.5rem;
  transition: background-color, color 300ms ease-out;
  color: var(--color-darkwhite);
  width: 5rem;
  box-shadow: 1px 1px lightgray;
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

const MobileStyledNavLink = styled(StyleNavLink)`
  display: flex;

  ${media.greaterThan("medium")`
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
  border: 1px solid var(--color-darkwhite);

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

const NonUserBtn = styled.button`
  border: 0.5px solid white;
  background-color: var(--color-mainviolet--100);
  padding: 0.5rem .8rem;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:1.2rem;
  line-height: 1;
  ${({main}) => 
    main && css`
    color: black;
    background-color: white;
    `}
    :hover{
      background-color: var(--color-mainviolet--50);
      ${({ main }) => 
      main && css`
        background-color: var(--color-mainviolet--50);
        opacity:1;
      `}
    }
    ${media.lessThan("medium")`
      padding:0.5rem 0.75rem;
      margin-left: 0.25rem;
    `}
`;

const NonUserBtns = styled.div`
  .nav-btn-signin{
    border: 0.5px solid white;
    background-color: #646fcb;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-size:1.8rem;
  }
  .nav-btn-signup{
    border: 0.1rem solid white;
    background-color: var(--color-mainviolet--100);
    color: var(--color-darkwhite);
    border-radius: 10px;
    cursor: pointer;
    font-size:1.8rem;
    margin: 0 1.1rem;
  }
`

const LogoutBtn = styled.button`
  margin: 0 10px;
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size:1.8rem;
`

const UserBtns = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex: 1 0 1;
  .nav-btn{
    color: black;
  }
`

const Text = styled.span`
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-darkwhite);
  ${media.lessThan("medium")`
    margin-left: 0.96rem;
    font-size: 1.2rem;
  `}
`;

const UserImg = styled.img`
  width: 3rem;
  height: 3rem;
  max-width: 100%;
  border-radius: 50%;
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
  align-items: end;
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
  border-radius: 0 0 0.5rem 0.5rem ;
  border-bottom: 1px solid var(--color-lightgray);
  transition: background-color 100ms ease-out;

  :hover {
    background-color: var(--color-darkwhite);
  }
`;

const PcUserInfoLogoutBtn = styled.button`
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
  const {id, username, image, isLogin} = useSelector(({authReducer})=> authReducer);
  

  const handleHamburgerClick = () =>{
    setIsHambugBtnClicked((prev) => !prev);
    setIsUserBtnClicked(false);
  }

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
    const storageKey = document.cookie.split('; ')
            .find(row => row.startsWith('accessToken'))
            .split('=')[1]
    const res = await user.logoutApi();
    if(res.status === 200) {
      localStorage.removeItem(storageKey)
      dispatch(signoutAction());
      history.push("/")
    }
  };

  return (
      <HeaderStyle>
            <NavbarTitle onClick={() => window.location.assign('https://walkingdogs.link')}>
              <NavTitleImg 
                src='https://walkingdogs.s3.ap-northeast-2.amazonaws.com/original/WalkingDogsTitleLogo.png'
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
                  <UserIcon size={1.2} user={{id, username, image}} isDisabled/>
                </MobileUserContainer>  
                <MobileStyledH4> Page </MobileStyledH4>
                <StyleNavLink to='/' onClick={closeAll}>
                  <Text> 홈 </Text>
                </StyleNavLink>
                <StyleNavLink to='/roomlist' onClick={closeAll}>
                  <Text> 모임 </Text>
                </StyleNavLink>
                <MobileStyledH4> Account </MobileStyledH4>
                <MobileStyledNavLink to='/mypage' onClick={closeAll}>
                  <Text>마이 페이지</Text>
                </MobileStyledNavLink>
                  <MobileNavBtn onClick={handleSignOut}>
                    <Text>로그아웃</Text>
                  </MobileNavBtn>
              </Navs>
          )}

        {!isLogin && (
          <NonUserBtns>
            <NonUserBtn 
            className='nav-btn-signin' 
            onClick={()=>dispatch(signinModalOnAction())}> 
              로그인
            </NonUserBtn>
            <NonUserBtn 
            className='nav-btn-signup' 
            onClick={()=>dispatch(signupModalOnAction())}>
              회원가입
            </NonUserBtn>
          </NonUserBtns>
        )}
        {isLogin && (
          <UserBtns>
            <UserName onClick={() => history.push('/mypage')}>{username}</UserName>
              <UserImg src={image} onClick={() => history.push('/mypage')}/>
            <LogoutBtn onClick={handleSignOut}>로그아웃</LogoutBtn>
          <MobileHambergerBtn className="nav-btn" onClick={handleHamburgerClick}>
            <FontAwesomeIcon icon={faBars}/>
          </MobileHambergerBtn>
          {isUserBtnClicked && (
            <PcUserInfo>
               <PcUserInfoMyPageBtn to='/mypage' onClick={handleUserInfoClick}> 
               마이 페이지 
               </PcUserInfoMyPageBtn>
               <PcUserInfoLogoutBtn onClick={handleSignOut}> 로그아웃 </PcUserInfoLogoutBtn>
             </PcUserInfo>
           )}
          </UserBtns>
        )}
      </HeaderStyle>
  );
}

export default Nav;