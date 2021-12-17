import React, { useEffect, useState } from 'react';
import mypage from '../api/mypage';
import {
  passwordChgModalOnAction,
  updateInfoAction,
} from '../store/actions';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import user from '../api/users';

import {FaTimesCircle, FaPlusCircle} from 'react-icons/fa'
// 남은 것
// image 추가 버튼, image 추가 로직
// 패스워드 변경 모달 (모달 완성 시 순상 호출 부탁드립니다.)
// 전체 스타일링 (중요도 낮음)

const Container = styled.div`
  border: 2rem solid var(--color-mainviolet--100);
  border-bottom: none;
  width: auto;
  height: 60rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PasswordChgBtn = styled.button`
  border: 0.5px solid white;
  background-color: var(--color-darkwhite);
  color: black;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.8rem;
`;

const ProfileChgBtn = styled.button`
  border: 0.5px solid white;
  background-color: var(--color-darkwhite);
  color: black;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.8rem;
  gap: 1rem;
`;

const BtnContainer = styled.div`
  justify-content: space-evenly;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid red;
  margin: 10px 10px;
  width: 50%;
  height: 50%;
  padding: 0px;
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  position: absolute;
  max-width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ImageAddFile = styled.input`
  position: absolute;
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  z-index: 0;
  display: none;
`;

const DogProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 10px;
  width: 50%;
  height: 50%;
  padding: 0px;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
`;

const DogProfileImage = styled.img`
  position: absolute;
  max-width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const DogImageAddFile = styled.input`
  position: absolute;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  z-index: 10;
  visibility: hidden;
`;

const DogList = styled.div`
  text-align: center;
  gap: 1.1rem;
  display: flex;
  align-items: center;
  width: auto;
  span  {
    padding: 0.3rem 0.3rem;
    font-size: ${(props)=>{
      if(props.className === 'dogbreed') return '0.6rem'
      if(props.className === 'dogsize') return '0.6rem'
        return '1.5rem';
    }}
    background: var(--color-darkwhite);
    border-radius: 10px;
  }
  button{
    font-size: 1.5rem;
    gap: 1rem;
  }
`;

const InputChgContainer = styled.div`
  border-radius: 1rem;
  background-color: var(--color-mainviolet--100);
  margin: 0;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  width: ${(props)=>{
    if(props.className === 'username') return '13rem';
    if(props.className === 'petname')  return '10rem';
    return "10rem";
  }}
  height: 6rem;
  text-align: center;
  margin: 1.2rem;
  font-size: ${(props) => {
    if(props.className === 'username') return '1.4rem';
    if(props.className === 'petname') return '1.1rem';
    if(props.className === 'breed') return '1.4rem';
    return "1.4rem";
  }};
`

const DogInfoBox = styled.div`
  border-bottom: 1.1rem solid var(--color-darkwhite);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  select {
    align-self: center;
    width: 10vw;
    height: 2rem;
    font-size:1.1rem;
    justify-content: space-between;
  }
  .radio_box{
    font-size: 1.2rem;
  }
  .select_box{
    display: flex;
    justify-content: space-evenly;
  }
`

const NicknameBox = styled.div`
    border-bottom: 1rem solid var(--color-darkwhite);
    width:auto;
    height:8vh;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
  border: 1px solid var(--color-hotstone);
  width: 20vw;
  height: auto;
  align-self: center;
  background: var(--color-darkwhite);
`

const RadioBox = styled.div`
  display: flex;
  justify-content:center;
  border-radius: 1rem; 
  width: 15rem;
  height: auto;
  align-items: space-between;
  align-self: center;
  background: var(--color-darkwhite);
  input{
    display: inline-block;
    font-size: 2rem;
  }
`

const DogListBox = styled.div`
  width: auto;
  border-bottom: 1rem solid var(--color-darkwhite);
  display: flex;
  justify-content: space-evenly;
  background: yellowgreen;
  span{
    background: var(--color-darkwhite);
  }
`



//styled-component Boundary
const Mypagechg = () => {
  const [infos, setInfos] = useState({ userName: '', dogs: [], image: '' });
  const [files, setFiles] = useState('');
  const { image } = useSelector(({ authReducer }) => authReducer);
  const { isPasswordChgModal } = useSelector(
    ({ modalReducer }) => modalReducer
  );

  const [choice, setChoice] = useState({
    name: '',
    breed: '',
    size: '',
    neutering: false
  });

  const dispatch = useDispatch();

  const choiceOpt = [
    '--견종을 선택하세요--',
    '진도',
    '포메라니안',
    '골든리트리버',
    '시츄',
    '비숑프리제',
    '불독',
    '닥스훈트',
    '비글',
    '시바-일본',
    '푸들',
    '치와와',
    '시베리안 허스키'
  ];

  const options = choiceOpt.map((breed) => {
    return <option value={breed}>{breed}</option>;
  });

  const choiceSizeOpt = ['--크기를 선택하세요--', '대형견', '중형견', '소형견'];

  const sizeOptions = choiceSizeOpt.map((size) => {
    return <option value={size}>{size}</option>;
  });

  const handleChangeNameField = (e) => {
    const field = e.target;
    const data = e.target.value;

    if (field.className === 'myinfo_chg_username_input') {
      setInfos(Object.assign({ ...infos }, { userName: data }));
    } else if (field.className === 'myinfo_chg_petname') {
      setChoice(Object.assign({ ...choice }, { name: data }));
    }
  };

  const handleClickAdd = () => {
    if (
      choice.name !== '' &&
      choice.breed !== '' &&
      choice.breed !== '--견종을 선택하세요--' &&
      choice.size !== '' &&
      choice.size !== '--크기를 선택하세요--'
    )
      setInfos(Object.assign({ ...infos }, { dogs: [...infos.dogs, choice] }));
    else {
      alert('강아지 이름, 크기, 견종을 전부 입력하였는지 확인해주세요.');
    }
  };

  const handleChangeProfileBtnClick = async () => {
    const result = await mypage.profileApi({
      username: infos.userName,
      dogs: [...infos.dogs],
      image: files
    });

    setInfos(
      Object.assign(
        { ...infos },
        {
          image: result.data.data.image,
          dogs: [...result.data.data.dogs],
          userName: result.data.data.username
        }
      )
    );

    dispatch(
      updateInfoAction({
        username: result.data.data.username,
        image: result.data.data.image
      })
    );

    localStorage.setItem(
      'userData',
      JSON.stringify({
        username: result.data.data.username,
        image: result.data.data.image
      })
    );
  };

  const handleClickOpts = (e) => {
    const data = e.target.value;

    if (e.target.name === 'breed') {
      // 견종을 입력했을 때,
      setChoice(Object.assign({ ...choice }, { breed: data }));
    } else {
      // 사이즈를 입력했을 때,
      setChoice(Object.assign({ ...choice }, { size: data }));
    }
  };

  const handleRadioClick = (e) => {
    const data = JSON.parse(e.target.value);

    setChoice(Object.assign({ ...choice }, { neutering: data }));
  };

  const handleDiscardBtnClick = (selIdx) => {
    const list = infos.dogs.filter((_, idx) => idx !== selIdx);

    setInfos(Object.assign({ ...infos }, { dogs: [...list] }));
  };

  const handleImage = async event => {
    let formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
      await user
        .userImageApi(formData)
        .then((result) => {
          console.log('result: ', result);
          const file = result.data.data.image;
          setFiles(file);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      alert('server error');
    }
  };

  const handleDogImage = async (event, idx) => {
    let formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
      await user
        .dogImageApi(formData)
        .then((result) => {
          const file = result.data.data.image;
          const arr = infos.dogs.map((elem, i) => {
            if (i === idx) {
              return Object.assign({ ...elem }, { image: file });
            } else {
              return elem;
            }
          });
          setInfos(Object.assign({ ...infos }, { dogs: arr }));
          console.log('infos: ', infos);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      alert('server error');
    }
  };

  const handleMouseOverOnImg = (e) => {
    e.target.textContent = '사진 변경';
  };

  const handleMouseLeaveOnImg = (e) => {
    e.target.textContent = '';
  };

  useEffect(() => {
    const initFunction = async () => {
      window.scrollTo(0,0);
      const result = await mypage.dogListApi();
      
      setFiles(image);
  
      setInfos(Object.assign({ ...infos }, { dogs: [...result.data.dogs] }));
      // console.log(infos.dogs);
    }

    initFunction();

  }, []);

  return (
    <>
      <Container className="container">
        <ProfileContainer className="myinfo_chg_img" onClick={() => { document.body.querySelector(`#add_img`).click(); }} >
          <ProfileImage className="myinfo_img" src={files ? files : image} />
          <ImageAddFile
            id="add_img"
            className="myinfo_chg_img_btn"
            type="file"
            accept="image/*"
            onMouseOver={(e) => handleMouseOverOnImg(e)}
            onMouseLeave={(e) => handleMouseLeaveOnImg(e)}
            onChange={handleImage}
          />
        </ProfileContainer>



        <InputChgContainer className="myinfo_chg_input_container"> 
              <NicknameBox>
              <div className="username_box">
                    <Label className="username">닉네임</Label>
                    <Input
                      type="text"
                      className="username_input"
                      onChange={(e) => handleChangeNameField(e)}
                    />
                  </div>
              </NicknameBox>
          
          
          <DogInfoBox>
            <div className='petinfo_name'>
              <Label className="petname">강아지 이름</Label>
              <Input
                type="text"
                className="petname_input"
                onChange={(e) => handleChangeNameField(e)}
              />
            </div>
            <div className='petinfo_breed'>
              <div className='select_box'>
              <Label className="petbreed">견종</Label>
                  <select name="size" onChange={(e) => handleClickOpts(e)}>
                  {sizeOptions}
                  </select>
                
                  <select name="breed" onChange={(e) => handleClickOpts(e)}>
                  {options}
                </select>
              </div>
            <RadioBox className='radio_box'>
              <span> 중성화 여부: </span>
            <input
              type="radio"
              name="neutering"
              value={true}
              onChange={(e) => handleRadioClick(e)}
              checked={choice.neutering ? true : false}
            />
            O
            <input
              type="radio"
              name="neutering"
              value={false}
              onChange={(e) => handleRadioClick(e)}
              checked={choice.neutering ? false : true}
            />
            X
            </RadioBox>
            </div>
            <button onClick={handleClickAdd}>
              <FaPlusCircle/>
            </button>
          </DogInfoBox>
              
              {infos.dogs.map((el, idx) => {
                return (
                  <DogListBox
                    key={idx}
                  >
                    <DogProfileContainer className="myinfo_chg_img" onClick={() => { document.body.querySelector(`#add_dog_img_${idx}`).click() }}>
                      <DogProfileImage
                        className="myinfo_img"
                        src={infos.dogs[idx].image}
                      />
                      <DogImageAddFile
                        id={`add_dog_img_${idx}`}
                        className="myinfo_chg_img_btn"
                        type="file"
                        accept="image/*"
                        onMouseOver={(e) => handleMouseOverOnImg(e)}
                        onMouseLeave={(e) => handleMouseLeaveOnImg(e)}
                        onChange={(e) => handleDogImage(e, idx)}
                      />
                    </DogProfileContainer>
                    {/* <img src={dogImage} width={100} height={100}/> */}
                    <DogList>
                      <span className='dogname'>{el.name}</span>
                      <span className='dogbreed'>{el.breed}</span>
                      <span className='dogsize'>{el.size}</span>
                      <span className='dogneut'>{el.neutering ? '중성화 O' : '중성화 X'}</span>
                      <button onClick={() => handleDiscardBtnClick(idx)}>
                        <FaTimesCircle/>
                      </button>
                    </DogList>
                  </DogListBox>
                );
              })}
            <BtnContainer className="profile_btn_container">
              <ProfileChgBtn
                className="profile_chg_btn"
                onClick={handleChangeProfileBtnClick}
              >
                Profile Change Button
              </ProfileChgBtn>

              {!isPasswordChgModal && (
                <PasswordChgBtn
                  onClick={() => dispatch(passwordChgModalOnAction())}
                >
                  비밀번호 변경
                </PasswordChgBtn>
              )}
            </BtnContainer>
        </InputChgContainer>
      </Container>
    </>
  );
};

export default Mypagechg;

// ImageEditBox.propTypes = {
//   setInfos: PropTypes.func,
//   setPhoto: PropTypes.func,
//   image: PropTypes.string
// };

//setInfos, setPhoto, image
