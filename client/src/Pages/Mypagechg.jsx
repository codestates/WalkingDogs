import React, { useEffect, useState } from 'react';
import mypage from '../api/mypage';
import {
  passwordChgModalOnAction,
  modalOffAction,
  updateInfoAction
} from '../store/actions';
import AllButtons from '../Components/AllButtons';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from 'axios';
import { eachYearOfInterval, previousTuesday } from 'date-fns/esm';
import userApi from '../api/users';
// 순상 : 강아지 list 쪽 CSS 스타일 임시로 넣어놓았습니다.
// 순상 : CSS 수정 부탁드립니다. ( contents 정렬 )

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
  input {
    border: 1px solid red;
  }
`;

const PasswordChgBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 25px;
`;

const ProfileChgBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.8rem;
`;

const ImageEditInput = styled.div`
  align-items: left;
  border: 1px solid red;
  padding: 0rem 0.5rem;
  flex-direction: row;
  border-radius: 0.3rem;
  width: 11.5rem;
  label {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10rem;
    height: 2rem;
    color: black;
    list-style: none;
    cursor: pointer;
    margin: 4px;
  }
`;

const InfoChgContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  border: 2px solid green;
  width: 28rem;
  height: 40rem;
  margin-bottom: 0.5rem;
`;

// width: 24rem;
// height: 24rem;
// border-radius: 100%;
// margin: 1rem;
// border: 2px solid red;

const NicknameBox = styled.label`
  border: 1px solid red;
`;

const BtnContainer = styled.div`
  justify-content: center;
`;

const StyledDefaultProfile = styled.img`
  width: 24rem;
  height: 24rem;
  border-radius: 100%;
  margin: 1rem;
  border: 1px solid gray;
  aspect-ratio: 1;
  ${media.lessThan('medium')`
    margin: auto 2.5em 2rem 2.5rem;
  `}
`;

const EditDetails = styled.details`
  position: relative;
  width: 7rem;
  height: 1.2rem;
  margin: 1px;
  border: 1px solid gray;
  ${media.lessThan('medium')`
    margin-top: 1rem;
    margin-left: -7rem;
  `}
`;

const EditTooltip = styled.div`
  width: 1rem;
  height: 1rem;
  border: 0.6rem solid transparent;
  border-bottom-color: var(--color-maingreen--100);
  margin-left: 0.5rem;
  margin-bottom: -0.2rem;
  div {
    position: absolute;
    margin: -0.3rem auto auto -0.48rem;
    border: 0.45rem solid transparent;
    border-bottom-color: var(--color-darkwhite);
    width: 0.8rem;
    height: 0.8rem;
    z-index: 99;
  }
`;

const EditSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: 1rem;
  font-family: Jua;
  width: 7rem;
  height: 1.5rem;
  color: black;
  background-color: var(--color-mainviolet-100);
  list-style: none;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-bottom: -0.5rem;
`;

// .myinfo_chg_img{
//   position: relative;
//   display: flex;
//   align-items: center;
//   border: 1px solid red;
//   margin: 10px 10px;
//   width: 50%;
//   height: 50%;
//   padding: 0px;
//   width: 25rem;
//   height: 25rem;
//   border-radius: 50%;
//   overflow: hidden;
// }

// .myinfo_img{
//   position: absolute;
//   max-width: 100%;
//   height: auto;
//   display: block;
// }

// .myinfo_chg_img_btn{
//   position: absolute;
//   width: 25rem;
//   height: 25rem;
//   border-radius: 50%;
//   z-index: 10;
// }
// .myinfo_chg_img_btn:hover{
//   background-color: rgba(128, 128, 128, 0.1);
// }

const ChangeImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 10px;
  width: 50%;
  height: 50%;
  padding: 0px;
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ImageAddButton = styled.button`
  position: absolute;
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  z-index: 10;
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
  height: auto;
  display: block;
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
  border: 1px solid red;
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
  height: auto;
  display: block;
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
  justify-content: center;
  display: flex;
  align-items: center;
`;

const ImageEditBox = () => {
  const [seletedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.file[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();

    formData.append('userfile', seletedFile, seletedFile.name);
  };

  return (
    <EditDetails>
      <EditSummary>이미지 불러오기</EditSummary>
      <details-menu role="menu">
        <ImageEditInput>
          <label>
            이미지 업로드
            <input
              id="photo"
              type="file"
              style={{ display: 'none' }}
              accept="image/*, video/mp4"
            />
          </label>
          <label tabIndex="0" role="menuitem">
            기본사진으로 되돌리기
          </label>
        </ImageEditInput>
      </details-menu>
    </EditDetails>
  );
};

//styled-component Boundary
const Mypagechg = () => {
  const [infos, setInfos] = useState({ userName: '', dogs: [], image: '' });
  const [photo, setPhoto] = useState('');

  const [isChgMode, setIsChgMode] = useState(false);

  const [pwChgMode, setPwChgMode] = useState(false);
  const [isMypage, setIsMyPage] = useState(false);

  const [files, setFiles] = useState('');
  // const [dogFiles, setDogFiles] = useState({});
  const { image, username } = useSelector(({ authReducer }) => authReducer);

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
      await userApi
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
      await userApi
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

  useEffect(async () => {
    window.scrollTo(0,0);
    const result = await mypage.dogListApi();

    setFiles(image);

    setInfos(Object.assign({ ...infos }, { dogs: [...result.data.dogs] }));
    console.log(infos.dogs);
  }, []);

  return (
    <>
      <Container className="container">
        <ProfileContainer className="myinfo_chg_img">
          <ProfileImage className="myinfo_img" src={files ? files : image} onClick={() => { document.body.querySelector('\#add_img').click(); }} />
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

        <div className="myinfo_chg_input_container">
          <div className="myinfo_chg_box">
            <NicknameBox className="myinfo_chg_username">닉네임</NicknameBox>
            <input
              type="text"
              className="myinfo_chg_username_input"
              onChange={(e) => handleChangeNameField(e)}
              style={{ border: '1px solid black' }}
            />
            <br />
            <label className="myinfo_chg_petname">강아지 이름</label>
            <input
              type="text"
              className="myinfo_chg_petname"
              onChange={(e) => handleChangeNameField(e)}
              style={{ border: '1px solid black' }}
            />
            <br />
            <label className="myinfo_chg_petbreef">견종</label>
            <select name="size" onChange={(e) => handleClickOpts(e)}>
              {sizeOptions}
            </select>
            <select name="breed" onChange={(e) => handleClickOpts(e)}>
              {options}
            </select>
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
            X<button onClick={handleClickAdd}>추가</button>
            <div
              className="dogs_container"
              style={{ height: '400px', overflow: 'auto' }}
            >
              {infos.dogs.map((el, idx) => {
                return (
                  <li
                    key={idx}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <DogProfileContainer className="myinfo_chg_img">
                      <DogProfileImage
                        className="myinfo_img"
                        src={infos.dogs[idx].image}
                        onClick={() => { document.body.querySelector(`#add_dog_img_${idx}`).click() }}
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
                      <span>{el.name}</span>
                      <span>{el.breed}</span>
                      <span>{el.size}</span>
                      <span>{el.neutering ? '중성화 O' : '중성화 X'}</span>
                      <button onClick={() => handleDiscardBtnClick(idx)}>
                        X
                      </button>
                    </DogList>
                  </li>
                );
              })}
            </div>
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default Mypagechg;

ImageEditBox.propTypes = {
  setInfos: PropTypes.func,
  setPhoto: PropTypes.func,
  image: PropTypes.string
};

//setInfos, setPhoto, image
