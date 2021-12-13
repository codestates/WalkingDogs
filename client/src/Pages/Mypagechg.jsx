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
import Modal from '../Components/Modal';
import PwChange from '../Components/PwChange';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { eachYearOfInterval, previousTuesday } from 'date-fns/esm';
import userApi from '../api/users';
// 순상 : 강아지 list 쪽 CSS 스타일 임시로 넣어놓았습니다.
// 순상 : CSS 수정 부탁드립니다. ( contents 정렬 )

// 남은 것
// image 추가 버튼, image 추가 로직
// 패스워드 변경 모달 (모달 완성 시 순상 호출 부탁드립니다.)
// 전체 스타일링 (중요도 낮음)

const ProfileChgBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 25px;
`;

const PasswordChgBtn = styled.button`
  border: 0.5px solid white;
  background-color: #646fcb;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 25px;
`;

const ModalContainer = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem;
  color: darkgray;
  background-color: #646fcb;
  ${props => {
    props.bgColor &&
      css`
        background-color: ${props.bgColor};
      `;
  }};
  ${media.lessThan('medium')`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateY(0)
    min-height: 100%;
    min-width: 100%;
    border-radius: 0;
  `};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrap = styled.div`
`

//styled-component Boundary
const Mypagechg = () => {

  const [infos, setInfos] = useState({ userName: '', dogs: [], image: '' });

  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [pwChgMode, setPwChgMode] = useState(false);
  const [isMypage, setIsMyPage] = useState(false);

  const [files, setFiles] = useState('');
  const { image, username } = useSelector(({authReducer}) => authReducer)

  const { isPasswordChgModal } = useSelector(
    ({ modalReducer }) => modalReducer
  );

  const [choice, setChoice] = useState({
    name: '',
    breed: '',
    size: '',
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

  const choiceSizeOpt = [
    '--크기를 선택하세요--',
    '대형견',
    '중형견',
    '소형견',
  ]

  const sizeOptions = choiceSizeOpt.map(size => {
    return <option value={size}>{size}</option>
  })

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
      choice.breed !== '--견종을 선택하세요--' &&
      choice.size !== '' &&
      choice.size !== '--크기를 선택하세요--'
    )
      setInfos(Object.assign({ ...infos }, { dogs: [...infos.dogs, choice] }));
    else {
      alert('강아지 이름, 크기, 견종을 전부 입력하였는지 확인해주세요.')
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

    dispatch(updateInfoAction({ username: result.data.data.username, image: result.data.data.image }));
  };

  const handleChangePasswordBtnClick = () => {
    // 순상 : 진희님 패스워드 변경 modal 창 추가 부탁드립니다.
    setIsPwModalOpen(!isPwModalOpen);
  };

  const handleClickOpts = e => {
    const data = e.target.value;
    
    if(e.target.name === 'breed') { // 견종을 입력했을 때,
      setChoice(Object.assign({ ...choice }, { breed: data }));
    }
    else { // 사이즈를 입력했을 때,
      setChoice(Object.assign({ ...choice }, { size: data }));
    }
  };

  const handleRadioClick = e => {
    const data = JSON.parse(e.target.value);

    setChoice(Object.assign({ ...choice }, { neutering: data }));
  };

  const handleDiscardBtnClick = selIdx => {
    const list = infos.dogs.filter((_, idx) => idx !== selIdx);

    setInfos(Object.assign({ ...infos }, { dogs: [...list] }));
  };

  const handleImage = async event => {
    let formData = new FormData();
    console.log('formData: ',formData);
    console.log('event.target.files: ', event.target.files);
    formData.append('image', event.target.files[0]);
    console.log('formData2: ', formData);
    try {
      await userApi.userImageApi(formData)
      .then((result) => {
        console.log('result: ', result);
        const file = result.data.data.image;
        console.log(file);
        setFiles(file);
        // const newObj = Object.assign({}, {image: file})
        // setInfos(newObj);
      })
      .catch((err) => {
        console.log(err);
      })
      
    } catch (error) {
      console.log(error);
      alert('server error');
    }
  };

  const handleMouseOverOnImg = (e) => {
    e.target.textContent = '사진 변경'
  }

  const handleMouseLeaveOnImg = (e) => {
    e.target.textContent = ''
  }

  useEffect(async () => {
    const result = await mypage.dogListApi();

    setInfos(Object.assign({ ...infos }, { dogs: [...result.data.dogs] }));
  }, []);
  
  return (
    <>
      <div className="myinfo_chg_container">
        <div className="myinfo_chg_img">
          <img className="myinfo_img" src={image}/>
          <button className="myinfo_chg_img_btn"
            onMouseOver={(e) => handleMouseOverOnImg(e)}
            onMouseLeave={(e) => handleMouseLeaveOnImg(e)}
            onClick={handleImage}
          >
            </button>
        </div>

        <div className="myinfo_chg_input_container">
          <div className="myinfo_chg_box">
            <label className="myinfo_chg_username">닉네임</label>
            <input
              type="text"
              className="myinfo_chg_username_input"
              onChange={e => handleChangeNameField(e)}
              style={{ border: '1px solid black' }}
            />
            <br />
            <label className="myinfo_chg_petname">강아지 이름</label>
            <input
              type="text"
              className="myinfo_chg_petname"
              onChange={e => handleChangeNameField(e)}
              style={{ border: '1px solid black' }}
            />
            <br />
            <label className="myinfo_chg_petbreef">견종</label>
            <select name='size' onChange={e => handleClickOpts(e)}>{sizeOptions}</select>
            <select name='breed' onChange={e => handleClickOpts(e)}>{options}</select>
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
                    <span>{el.size}</span>
                    <span>{el.neutering ? '중성화 O' : '중성화 X'}</span>
                    <button onClick={() => handleDiscardBtnClick(idx)}>
                      X
                    </button>
                  </li>
                );
              })}
            </div>
            <div className="profile_btn_container">
              <ProfileChgBtn
                className="profile_chg_btn"
                onClick={handleChangeProfileBtnClick}
              >
                Profile Change Button
              </ProfileChgBtn>

              {!isPasswordChgModal && (
                <PasswordChgBtn onClick={() => dispatch(passwordChgModalOnAction())}>
                  비밀번호 변경
                </PasswordChgBtn>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypagechg;
