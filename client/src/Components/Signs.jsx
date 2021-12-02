import React ,{useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {modalOffAction, 
        signinModalOnAction, 
        signupModalOnAction} from '../store/actions';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;   
    justify-content: center;
    width: auto;
    height: auto;
    margin: 4rem 2rem 0rem 2rem;
    *{
      width: 20rem;
      height: 3rem;
      margin: 0.5rem 0rem;
    }
    input{
        height: 2.3rem;
        border: 1px solid var(--color-gray);
        border-radius: 0.4rem;
        :first-of-type{
            margin-top: 1rem;
        }
        :last-of-type{
            margin-bottom: 1rem;
        }
    }
    button{
        color: var(--color-gray);
    }
`

export const Logo = styled.img`
    width: calc(5.36 * 2.5rem);
    height: 2.5rem;
    object-fit: fill;
`

export const InputContainer = styled.div`
    height: auto;
`

export const Input = styled.input`
    height: 2rem;
    padding: 0 0.5rem;
    font-size: 0.875rem;
    color: var(--color-black);
    ::placeholder{
        color: var(--color-gray);
    }
`

export const ErrMessage = styled.div`
    color: var(--color-red);
    font-size: 0.8rem;
    padding: 0 1rem;
    height: 0.5rem;
`

export const VerifiedMessage = styled.div`
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div{
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
    * {
        font-size:0.5rem;
    }
`;

//styled-component Boundary

const Signs = ({ type }) => {

const dispatch = useDispatch();
const history = useHistory();

const [inputValue, setInputValue] = useState({
    email:"",
    password:"",
    passwordConfirm:"",
    userName:"",
});

const [validated, setValidated] = useState({
    email:true,
    password:true,
    passwordConfirm:true,
    userName:true,
});

const [errMsg, setErrMsg] = useState("");
const [isOnVerification, setIsVerification] = useState(false);

const handleTypeChange = () => {
    if(type === '로그인'){
        dispatch(modalOffAction);
        dispatch(signinModalOnAction);
    } 
        dispatch(modalOffAction);
        dispatch(signupModalOnAction);
}

const handleInputChange = debounce(async(e) => {
    const {name, value} = e.target;
    setInputValue({...inputValue, [name]: value});
    if(type === '로그인'){
        if(name === 'email'){
            const emailValue = 
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
            setValidated({ ...validated, [name]: emailValue });
        } else if (name === 'password') {
            const passwordValue = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
            setValidated({ ...validated, [name]: passwordValue });
        } 
    } else {
        if (name === 'email') {
            const emailValue = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
            setValidated({...validated, [name]: emailValue});
            if(value === "") setErrMsg("");
            else if (emailValue) {
                setErrMsg("");
                try {
                  //api email  
                } catch (error) {
                    // set api errMsg
                }
            }
        }
    }
})

    return isOnVerification ? (
        <>
            <VerifiedMessage>
                <Logo src='img/WalkingDogsTitleLogo'/>
                <div>

                </div>
            </VerifiedMessage>
        </>
    ) : (
        <>
        <Form>
            <Logo src='img/WalkingDogsTitleLogo'/>
                <InputContainer type={type}>
                    <Input name='email' placeholder='이메일'></Input>
                    <Input
                        name='password'
                        type='password'
                        placeholder='비밀번호'
                    ></Input>
                {type === '로그인' && <ErrMessage>{errMsg}</ErrMessage>}
                {type === '회원가입' && (
                    <>
                    <Input
                        name='passwordConfirm'
                        type='password'
                        placeholder='비밀번호 재입력'
                    ></Input>
                    <Input name='username' placeholder='닉네임'></Input>
                    <ErrMessage>{errMsg}</ErrMessage>
                    </>
                )}
                </InputContainer>
                <Button
                    bgColor={"var(--color-white)"}
                    color={"var(--color-violet-100) !important"}
                    >
                    {type === '로그인' ? '로그인' : '회원가입'}
                </Button>
        </Form>
        </>
    );
}

export default Signs;