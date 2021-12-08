import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  modalOffAction,
  signinAction,
  signinModalOnAction,
  signupModalOnAction,
} from '../store/actions';
import userApi from '../api/users';
require('dotenv').config();

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
  height: auto;
  margin: 3rem 2rem;
  background-color: #646fcb;
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
    :first-of-type {
      margin-top: 1rem;
    }
    :last-of-type {
      margin-bottom: 1rem;
    }
  }
  button {
    color: var(--color-gray);
  }
`;

export const Logo = styled.img`
  height: 5rem;
  object-fit: scale-down;
  background-color: #646fcb;
`;

export const InputContainer = styled.div`
  height: auto;
`;

export const Input = styled.input`
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

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-height: 3rem;
  font-size: 1rem;
  border: 1.5px solid var(--color-violet--100);
  border-radius: 30px;
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

export const KakaoBtn = styled.button`
  margin: 0px;
  display: flex;
  padding: 0px;
  border: 0px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const GoogleBtn = styled.button`
  margin: 0px;
  display: flex;
  padding: 0px;
  border: 0px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

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

  const handleTypeChange = () => {
    if (type === '로그인') {
      dispatch(modalOffAction);
      dispatch(signupModalOnAction);
    }
    dispatch(modalOffAction);
    dispatch(signinModalOnAction);
  };

  const handleInputChange = debounce(async e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (type === '로그인') {
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
          // setErrMsg("");
          // try {
          //     const res = await userApi.loginApi(value);
          //     res.status === 200 && setErrMsg("");
          // } catch (error) {
          //     setErrMsg("가입된 이메일 입니다.");
          // }
        }
        // else {
        //     setErrMsg("이메일 형식이 올바르지 않습니다.");
        // }
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
            '6-20정도 길이의 숫자 혹은 문자, 특수문자를 포함해야 합니다.',
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
          setErrMsg('비밀번호가 일치하지 않습니다');
        }
      }
    }
  }, 200);

const handleSign = async (e) => {
    e.preventDefault();
    if (type === '로그인') {
      const valueResult = validated.email && validated.password;
      if (valueResult) {
        const signInputValue = { ...inputValue };
        delete signInputValue.passwordConfirm;
        delete signInputValue.userName;
        try {
          const res = await userApi.loginApi(signInputValue);
          if (res.status === 200) {
            localStorage.setItem('userData', JSON.stringify({ ...res.data.data }))
            dispatch(signinAction(JSON.parse(localStorage.getItem('userData'))))
            dispatch(modalOffAction());
            history.push('/roomlist');
            // dispatch(modalOffAction) 1st, history.push('/')
          }
        } catch (error) {
          setErrMsg('입력 정보를 확인해 주세요.');
        }
      }
    } else {
      const valueResult = Object.values(validated).every(el => el === true);
      if (valueResult) {
        const signInputValue = { ...inputValue };
        delete signInputValue.passwordConfirm;
        try {
          console.log('signInputValue : ', signInputValue)
          const res = await userApi.signupApi(signInputValue);
          res.status === 201 && setIsOnVerification(true)
        } catch (error) {
          setErrMsg('정보를 확인해 주세요.');
        }
      } else {
        setErrMsg('정보를 다시 확인해 주세요.');
      }
    }
  };

  const handleClickOAuth = (e) => {
    const name = e.target.name
    const googleScope = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']
    
    if(name === 'google') {
      const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
      const REACT_APP_GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URL
      const scope = googleScope.join('+')
      const path = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_GOOGLE_REDIRECT_URL}&scope=${scope}&access_type=offline`

      window.location.assign(path)
    }
    else {
      const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
      const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI

      const path = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

      window.location.assign(path)
    }
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
            placeholder="이메일"
            onChange={handleInputChange}
          ></Input>
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={handleInputChange}
          ></Input>
          {type === '로그인' && <ErrMessage>{errMsg}</ErrMessage>}
          {type === '회원가입' && (
            <>
              <Input
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 재입력"
                onChange={handleInputChange}
              ></Input>
              <Input name="username" placeholder="닉네임" onChange={handleInputChange}></Input>
              <ErrMessage>{errMsg}</ErrMessage>
            </>
          )}
        </InputContainer>
        <OAuthContainer>
          <GoogleBtn type="button" name='google' onClick={(e) => handleClickOAuth(e)}>구글</GoogleBtn>
          <KakaoBtn type="button" name='kakao' onClick={(e) => handleClickOAuth(e)}>카카오</KakaoBtn>
        </OAuthContainer>
        <Button
          type="button"
          style={{ backgroundColor: '' }}
          onClick={e => handleSign(e)}
        >
          {type === '로그인' ? '로그인' : '회원가입'}
        </Button>
      </Form>
    </>
  );
};

export default Signs;
