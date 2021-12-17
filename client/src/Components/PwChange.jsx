import React ,{ useState }from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import {
  modalOffAction,
} from '../store/actions';

import AllButtons from './AllButtons';
import mypage from '../api/mypage';
import useDeepCompareEffect from 'use-deep-compare-effect';


const Form = styled.form`
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
    background-color: var(--color-darkwhite);
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
  padding: 0;
  font-size: 0.875rem;
  color: black;
  ::placeholder {
    color: grey;
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
  border-radius: 30px;
  cursor: pointer;
  * {
    font-size: 0.5rem;
  }
`;

const ErrorMessage = styled.div`
  color: var(--color-red);
  font-size: 0.8rem;
  padding: 0rem 1rem;
  height: 0.5rem;
`;


//styled-component Boundary

const PwChange = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({
        old_password:'',
        new_password:'',
        new_password_check:'',
    })

    const [errMsg, setErrMsg] = useState("")

    const [validated, setValidated] = useState({
        old_password: true,
        new_password: true,
        new_password_check: true,
    })

    const handleTypeChange = () => {
        dispatch(modalOffAction)
    }

    const handleInputChange = debounce((e) => {
        
        const {name, value} = e.target;
        setInputValue({ ...inputValue, [name]:value });
        if(name === 'old_password'){
            const oldPwVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
            setValidated({...validated, [name]:oldPwVal});
            
            if(value === "") setErrMsg("");
            else if (oldPwVal){
                setErrMsg("");
                setInputValue(Object.assign({...inputValue}, { old_password: value }));
               
            } else {
                setErrMsg("올바른 비밀번호를 입력해주세요")
            }
        } else if (name === 'new_password'){
            const newPwVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
            setValidated({ ...validated, [name]:newPwVal});
         
            if(value === "") setErrMsg("");
            else if (newPwVal) {
                setErrMsg("");
                setInputValue(Object.assign({...inputValue}, { new_password: value }));
                
            } else {
                setErrMsg('6-20정도 길이의 숫자 혹은 문자, 특수문자를 포함해야 합니다.');
            }
        } else if (name === 'new_password_check') {
            const newPwVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
            const newPwConfirmVal = value === inputValue.new_password;
           
            
            if(value === "") setErrMsg("");
            else if (newPwVal && newPwConfirmVal) {
                setErrMsg("");
                setInputValue(Object.assign({...inputValue}, { new_password_check: value }));
            
            } else {
                setErrMsg("비밀번호가 일치하지 않습니다.");
            }
        }
       
        
    }, 200)

    const handleConfirm = async (e) => {
      // e.preventDefault();
       try {
          const res = await mypage.passwordApi(inputValue);
          if(res.status === 200) {
            setErrMsg("");
            handleTypeChange();
          } else {
            setErrMsg("입력하신 정보를 확인해 주세요")
            // setInputValue({
            //   old_password:'',
            //   new_password:'',
            //   new_password_check:'',
            // })
          }
        } catch(err) {
          console.log(err);
        }
    }
    useDeepCompareEffect(() => console.log(inputValue), [inputValue]);
    return(
        <>
        <Form>
            <Logo src="img/WalkingDogsTitleLogo.png" />
                <InputContainer>
                    <Input 
                      name='old_password'
                      type="password"
                      
                      placeholder='현재 비밀번호'
                      onChange={handleInputChange}
                    ></Input>
                    <Input
                      name='new_password'
                      type='password'
                    
                      placeholder='새로운 비밀번호'
                      onChange={handleInputChange}
                    ></Input>
                    <Input
                      name='new_password_check'
                      type='password'
                    
                      placeholder='새로운 비밀번호 확인'
                      onChange={handleInputChange}
                    ></Input>
                    <ErrorMessage>{errMsg}</ErrorMessage>
                </InputContainer>
              <Button onClick={handleConfirm}>확인</Button>
        </Form>
        </>
    );
}

export default PwChange;



// try{
//   const res = authApi.passwordApi(value);
//   res.status === 200 && setErrMsg("");
// } catch(error){
//   setErrMsg("현재 비밀번호가 일치하지 않습니다. ");
// }