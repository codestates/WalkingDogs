import React, { useEffect, useState } from 'react';
import mypage from '../api/mypage';
import './PageStyle/Mypagechg.css';

// 순상 : 강아지 list 쪽 CSS 스타일 임시로 넣어놓았습니다.
// 순상 : CSS 수정 부탁드립니다. ( contents 정렬 )

// 남은 것
// image 추가 버튼, image 추가 로직
// 패스워드 변경 모달 (모달 완성 시 순상 호출 부탁드립니다.)
// 전체 스타일링 (중요도 낮음)
const Mypagechg = () => {
  const [infos, setInfos] = useState({ userName: '', dogs: [], image: '' });

  const [choice, setChoice] = useState({
    name: '',
    breed: '',
    neutering: false,
  });

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
    )  // 강아지 이름이 적혀있지 않거나, 강아지 견종을 선택한 적이 없거나, 강아지 견종을 바꾸었다가 다시 --견종을 선택하세요--를 선택했거나
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
  };

  const handleChangePasswordBtnClick = () => {
    // 순상 : 진희님 패스워드 변경 modal 창 추가 부탁드립니다.
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

  return (
    <>
      <div className="myinfo_chg_container">
        <div className="myinfo_chg_img"></div>

        <div className="myinfo_chg_input_container">
          <div className="myinfo_chg_box">
            <label className="myinfo_chg_username">닉네임</label>
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
            <div className="profile_btn_container">
              <button
                className="profile_chg_btn"
                onClick={handleChangeProfileBtnClick}
              >
                Profile Change Button
              </button>
              <button
                className="profile_pw_btn"
                onClick={handleChangePasswordBtnClick}
              >
                Password Change Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypagechg;
