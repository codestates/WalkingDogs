import React, { useEffect, useState } from 'react';
import mypage from '../api/mypage';
import './PageStyle/Mypagechg.css';
import {
  passwordChgModalOnAction,
  modalOffAction,
  updateInfoAction,
} from '../store/actions';
import AllButtons from '../Components/AllButtons';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'

import axios from 'axios';

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
  height:  60rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  input {
    border: 1px solid red;
  }
`

const PasswordChgBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.8rem;
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
`

const InfoChgContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  border: 2px solid green;
  width: 28rem;
  height: 40rem;
  margin-bottom: 0.5rem;
`

const ProfileImage = styled.img`
  width: 24rem;
  height: 24rem;
  border-radius: 100%;
  margin: 1rem;
  border: 2px solid red;
`

const NicknameBox = styled.label`
  border: 1px solid red;
  
`

const BtnContainer= styled.div`
  justify-content: center;
`

const StyledDefaultProfile = styled.img`
  width: 24rem;
  height: 24rem;
  border-radius: 100%;
  margin: 1rem;
  border: 1px solid gray;
  aspect-ratio: 1;
  ${media.lessThan("medium")`
    margin: auto 2.5em 2rem 2.5rem;
  `}
`

const EditDetails = styled.details`
  position: relative;
  width: 7rem;
  height: 1.2rem;
  margin: 1px;
  border: 1px solid gray;
  ${media.lessThan("medium")`
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

const EditSummary =styled.summary`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size:1rem;
  font-family:Jua;
  width: 7rem;
  height: 1.5rem;
  color: black;
  background-color: var(--color-mainviolet-100);
  list-style: none;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-bottom: -0.5rem;
`

const ImageEditBox = () => {

  const [seletedFile, setSelectedFile] = useState(null);

  const handleFileChange =(e) => {
    setSelectedFile(e.target.file[0]);
  }

  const handleFileUpload = () => {
    const formData = new FormData();

    formData.append('userfile', seletedFile, seletedFile.name);
  }

  return (
    <EditDetails>
      <EditSummary>
        이미지 불러오기
      </EditSummary>
      <details-menu role="menu">
        <EditTooltip>
          <EditTooltip/>
        </EditTooltip>
        <ImageEditInput>
          <label>
            이미지 업로드
              <input
              id="photo"
              type="file"
              style={{display: "none"}}
              accept='image/*, video/mp4'
              />
          </label>
            <label tabIndex='0' role='menuitem'>
              기본사진으로 되돌리기 
            </label>
        </ImageEditInput>
      </details-menu>
    </EditDetails>
  )
}


//styled-component Boundary
const Mypagechg = () => {
  const [infos, setInfos] = useState({ userName: '', dogs: [], image: '' });
  const [photo, setPhoto] = useState("");

  const [isChgMode, setIsChgMode] = useState(false);

  const [pwChgMode, setPwChgMode] = useState(false);
  const [isMypage, setIsMyPage] = useState(false);

  const { image ,username } = useSelector(({ authReducer }) => authReducer);

  const { isPasswordChgModal } = useSelector(
    ({ modalReducer }) => modalReducer,
  );

  const [choice, setChoice] = useState({
    name: '',
    breed: '',
    neutering: false,
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
    '시베리안 허스키',
  ];

  const options = choiceOpt.map(breed => {
    return <option value={breed}>{breed}</option>;
  });

  const handleChangeNameField = e => {
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
      choice.breed !== '--견종을 선택하세요--'
    )
      // 강아지 이름이 적혀있지 않거나, 강아지 견종을 선택한 적이 없거나, 강아지 견종을 바꾸었다가 다시 --견종을 선택하세요--를 선택했거나
      setInfos(Object.assign({ ...infos }, { dogs: [...infos.dogs, choice] }));
    else {
      // 순상 : 채워지지 않은 필드에 안내를 해주는 것도 좋을 것 같습니다. (강아지 정보 한정)
    }
  };

  const handleChangeProfileBtnClick = async () => {
    const result = await mypage.profileApi({
      username: infos.userName,
      dogs: [...infos.dogs],
      image: infos.image,
    });
    setInfos(
      Object.assign(
        { ...infos },
        {
          image: result.data.data.image,
          dogs: [...result.data.data.dogs],
          userName: result.data.data.username,
        },
      ),
    );

    dispatch(updateInfoAction({
         username: result.data.data.username,
         image: result.data.data.image,
        }),
        );

        localStorage.setItem('userData', JSON.stringify({username, image}));
  };


  const handleClickOpts = e => {
    const data = e.target.value;

    setChoice(Object.assign({ ...choice }, { breed: data }));
  };

  const handleRadioClick = e => {
    const data = JSON.parse(e.target.value);

    setChoice(Object.assign({ ...choice }, { neutering: data }));
  };

  const handleDiscardBtnClick = selIdx => {
    const list = infos.dogs.filter((_, idx) => idx !== selIdx);

    setInfos(Object.assign({ ...infos }, { dogs: [...list] }));
  };

  useEffect(async () => {
    const result = await mypage.dogListApi();

    setInfos(Object.assign({ ...infos }, { dogs: [...result.data.dogs] }));
  }, []);


  const handleSumbit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", photo);
    formData.append("nickname", infos.userName);
    formData.append('dogs'. infos.dogs[0])
  }
  return (
    <>
      <Container>
        {infos.image ? (
        <ProfileImage src={infos.image}/> 
        ) : (
        <StyledDefaultProfile src='img/defaultProfile.jpeg'/>
        )}
          <ImageEditBox />
       
        <InfoChgContainer>
          <div className="myinfo_chg_box">
            <NicknameBox className="myinfo_chg_username">닉네임</NicknameBox>
            <input
              type="text"
              className="myinfo_chg_username_input"
              onChange={e => handleChangeNameField(e)}
            />
            <br />
            <label className="myinfo_chg_petname">펫 이름</label>
            <input
              type="text"
              className="myinfo_chg_petname"
              onChange={e => handleChangeNameField(e)}
            />
            <br />
            <label className="myinfo_chg_petbreef">견종</label>
            <select onChange={e => handleClickOpts(e)}>{options}</select>
            <input
              type="radio"
              name="neutering"
              value={true}
              onChange={e => handleRadioClick(e)}
              checked={choice.neutering ? true : false}
            />
            O
            <input
              type="radio"
              name="neutering"
              value={false}
              onChange={e => handleRadioClick(e)}
              checked={choice.neutering ? false : true}
            />
            X<button onClick={handleClickAdd}>추가</button>
            <div
              className="dogs_container"
              style={{ height: '100px', overflow: 'auto' }}
            >
              {infos.dogs.map((el, idx) => {
                return (
                  <li
                    key={idx}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{el.name}</span>
                    <span>{el.breed}</span>
                    <span>{el.neutering ? '중성화 O' : '중성화 X'}</span>
                    <button onClick={() => handleDiscardBtnClick(idx)}>
                      X
                    </button>
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

                  <PasswordChgBtn onClick={()=>dispatch(passwordChgModalOnAction(console.log(isPasswordChgModal)))}>
                    비밀번호 변경
                  </PasswordChgBtn>
              
            </BtnContainer>
          </div>
        </InfoChgContainer>
      </Container>
    </>
  );
};





export default Mypagechg;

ImageEditBox.propTypes = {
  setInfos : PropTypes.func,
  setPhoto: PropTypes.func,
  image: PropTypes.string,
};

//setInfos, setPhoto, image