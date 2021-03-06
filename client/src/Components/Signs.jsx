import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  modalOffAction,
  signinAction,
  // signinModalOnAction,
  // signupModalOnAction,
} from '../store/actions';

import {SiKakaotalk} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';

import AllButtons from './AllButtons'

import user from '../api/users';

require('dotenv').config();

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
  height: auto;
  margin: 3rem 2rem;
  background-color: var(--color-mainviolet--100);
  border-radius: 4%;
  * {
    width: 23rem;
    height: 3rem;
    margin: 0.5rem 0rem;
  }
  input {
    height: 2.4rem;
    border: 1px solid #000000;
    border-radius: 0.4rem;
    background-color: var(--color-darkwhite);
    :first-of-type {
      margin-top: 1rem;
    }
    :last-of-type {
      margin-bottom: 1rem;
    }
  }
  button {
    color: var(--color-black);
  }
`;

const Logo = styled.img`
  height: 5rem;
  object-fit: scale-down;
  background-color: #646fcb;
`;

const InputContainer = styled.div`
  height: auto;
`;

const Input = styled.input`
  height: 2rem;
  padding: 0px;
  font-size: 0.875rem;
  color: black;
  ::placeholder {
    color: grey;
  }
`;

export const ErrMessage = styled.div`
  color: var(--color-red);
  font-size: 0.8rem;
  padding: 0 1rem;
  height: 0.5rem;
`;

export const VerifiedMessage = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    margin-top: 1rem;
    text-align: center;
  }
`;

const Button = styled(AllButtons)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-height: 3rem;
  font-size: 1rem;
  border: 1.5px solid var(--color-violet--100);
  background-color: var(--color-darkwhite);
  border-radius: 1rem;
  cursor: pointer;
  * {
    font-size: 0.5rem;
  }
`;

export const OAuthContainer = styled.div`
  margin-top: -30px;
  padding: 0px;
  height: 10%;
  display: flex;
  justify-content: space-evenly;
`;


// export const OauthBtnWrap = styled.span`
//   margin: 0px;
//   display: flex;
//   padding: 0px;
//   border-radius: 1rem;
//   width: 11rem;
//   height: 50px;
//   justify-content: center;
//   align-items: center;
//   background-color: white;
//   font-size: 20px;
// `


// const FlexGuideContainer = styled.div`

//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   color: darkgray;

//   *{
//     display: flex;
//     align-items: center;
//     :first-child {
//       flex: 1.75 0 0;
//       justify-content: end;
//       padding-right: 1rem;
//     }
//     :last-child {
//       flex: 1 0 0;
//       justify-content: start;
//       padding-right: 1rem;
//     }
//   }
// `;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  div{
    width: 20rem;
  }
  .kakao{
    width: 10rem;
    height: 3rem;
    color: black;
    background-color: #f4da48;
    margin-right: 1rem;
    *{
      width: 2.5rem;
      height: auto;
      :first-child{
        margin-right: 0.2rem;
      }
    }
  }

  .google {
    width: 10rem;
    height: 3rem;
    color: black;
    background-color: #ffffff;
    *{
      width: 1rem;
      height: auto;
      :first-child{
        margin-right: 0.2rem;
      }
    }
  }
`


//styled-component Boundary

const Signs = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
  });

  const [validated, setValidated] = useState({
    email: true,
    password: true,
    passwordConfirm: true,
    userName: true,
  });

  const [errMsg, setErrMsg] = useState('');
  const [isOnVerification, setIsOnVerification] = useState(false);

  // const handleTypeChange = () => {
  //   if (type === '?????????') {
  //     dispatch(modalOffAction);
  //     dispatch(signupModalOnAction);
  //   }
  //   dispatch(modalOffAction);
  //   dispatch(signinModalOnAction);
  // };

  const handleInputChange = debounce(async e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (type === '?????????') {
      if (name === 'email') {
        const emailValue =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
            value,
          );
        setValidated({ ...validated, [name]: emailValue });
      } else if (name === 'password') {
        const passwordValue = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
          value,
        );
        setValidated({ ...validated, [name]: passwordValue });
      }
    } else {
      if (name === 'email') {
        const emailValue =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
            value,
          );
        setValidated({ ...validated, [name]: emailValue });
        if (value === '') setErrMsg('');
        else if (emailValue) {
          setErrMsg('');
          // setErrMsg("");
          // try {
          //     const res = await userApi.loginApi(value);
          //     res.status === 200 && setErrMsg("");
          // } catch (error) {
          //     setErrMsg("????????? ????????? ?????????.");
          // }
        } else {
            setErrMsg("????????? ????????? ???????????? ????????????.");
        }
      } else if (name === 'password') {
        const passwordValue = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
          value,
        );
        setValidated({ ...validated, [name]: passwordValue });
        if (value === '') setErrMsg('');
        else if (passwordValue) {
          setErrMsg('');
        } else {
          setErrMsg(
            '6-20?????? ????????? ?????? ?????? ??????, ??????????????? ???????????? ?????????.',
          );
        }
      } else if (name === 'passwordConfirm') {
        const passwordValue = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
          value,
        );
        const passwordConfirmValue = value === inputValue.password;
        if (value === '') setErrMsg('');
        else if (passwordValue && passwordConfirmValue) {
          setErrMsg('');
        } else {
          setErrMsg('??????????????? ???????????? ????????????');
        }
      }
    }
  }, 200);

const handleSign = async (e) => {
    e.preventDefault();
    if (type === '?????????') {
      const valueResult = validated.email && validated.password;
      if (valueResult) {
        const signInputValue = { ...inputValue };
        delete signInputValue.passwordConfirm;
        delete signInputValue.userName;
        try {
          const res = await user.loginApi(signInputValue);
          if (res.status === 200) {
            localStorage.setItem('userData', JSON.stringify({ ...res.data.data }))
            dispatch(signinAction(JSON.parse(localStorage.getItem('userData'))))
            dispatch(modalOffAction());
            history.push('/roomlist');
            // dispatch(modalOffAction) 1st, history.push('/')
          }
        } catch (error) {
          setErrMsg('?????? ????????? ????????? ?????????.');
        }
      }
    } else {
      const valueResult = Object.values(validated).every(el => el === true);
      if (valueResult) {
        const signInputValue = { ...inputValue };
        delete signInputValue.passwordConfirm;
        try {
          console.log('signInputValue : ', signInputValue)
          const res = await user.signupApi(signInputValue);
          res.status === 201 && setIsOnVerification(true)
        } catch (error) {
          setErrMsg('????????? ????????? ?????????.');
        }
      } else {
        setErrMsg('????????? ?????? ????????? ?????????.');
      }
    }
  };

  // const handleClickOAuth = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name
  //   const googleScope = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']
    
  //   if(name === 'google') {
  //     const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
  //     const REACT_APP_GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URL
  //     const scope = googleScope.join('+')
  //     const path = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_GOOGLE_REDIRECT_URL}&scope=${scope}&access_type=offline`

  //     window.location.assign(path)
  //   }
  //   else {
  //     const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
  //     const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI
  //     const path = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

  //     window.location.assign(path)
  //   }
  // }

  const handleSignGoogle = (e) => {
    e.preventDefault();
    const googleScope = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']
    const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
      const REACT_APP_GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URL
      const scope = googleScope.join('+')
      const path = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_GOOGLE_REDIRECT_URL}&scope=${scope}&access_type=offline`

      window.location.assign(path)
  }

  const handleSignKakao = (e) => {
     e.preventDefault();
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI
    const path = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

      window.location.assign(path)
  }

  return isOnVerification ? (
    <>
      <VerifiedMessage>
        <Logo src="img/WalkingDogsTitleLogo.png" />
      </VerifiedMessage>
    </>
  ) : (
    <>
      <Form>
        <Logo src="img/WalkingDogsTitleLogo.png" />
        <InputContainer type={type}>
          <Input
            name="email"
            placeholder="?????????"
            onChange={handleInputChange}
          ></Input>
          <Input
            name="password"
            type="password"
            placeholder="????????????"
            onChange={handleInputChange}
          ></Input>
          {type === '?????????' && <ErrMessage>{errMsg}</ErrMessage>}
          {type === '????????????' && (
            <>
              <Input
                name="passwordConfirm"
                type="password"
                placeholder="???????????? ?????????"
                onChange={handleInputChange}
              ></Input>
              <Input name="username" placeholder="?????????" onChange={handleInputChange}></Input>
              <ErrMessage>{errMsg}</ErrMessage>
            </>
          )}
        </InputContainer>

          <Button
            type="button"
            style={{ backgroundColor: '' }}
            onClick={e => handleSign(e)}
          >
            {type === '?????????' ? '?????????' : '????????????'}
          </Button>
        <FlexContainer>
          <Button type='button' className='google'  onClick={(e) => handleSignGoogle(e)}>
            <FcGoogle/>
              ??????
            </Button>
          <Button type='button' className='kakao'  onClick={(e) => handleSignKakao(e)}>
            <SiKakaotalk/>

            ?????????
          </Button>
        </FlexContainer>
      </Form>
    </>
  );
};

export default Signs;
