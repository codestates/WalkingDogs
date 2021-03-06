import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Roommap from '../Components/Roommap';
import Comments from '../Components/Comments';
import roomApi from '../api/room';
import mypage from '../api/mypage';
import media from 'styled-media-query';
import check from '../api/check';
import { useDispatch } from 'react-redux';
import { signinAction, signoutAction } from '../store/actions';
import { useCookies } from 'react-cookie';
// import { useDispatch } from 'react-redux';
// import useDeepCompareEffect from 'use-deep-compare-effect';

const OneroomContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1rem solid var(--color-mainviolet--100);
  background-color: var(--color-mainviolet--100);
`;

const OneroomBox = styled.div`
  border-radius: 10px;
`;

const RoomBox = styled.div`
  display: flex;
  min-width: 100rem;
  height: 25rem;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;
`;

const RoomBtnBox = styled.div`
  display: flex;
  min-width: auto;
  height: auto;
  margin: 10px;
  justify-content: space-around;
`;

const ImageBox = styled.img`
  width: 23rem;
  height: 23rem;
  border-radius: 100%;
  object-fit: fill;
`;

const RoominfoBox = styled.div`
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px gray;
  background-color: var(--color-mainviolet--25);
`;

const UsernameBox = styled.div`
  min-width: 3rem;
  height: 30px;
  margin: 0.3rem 1rem;
  text-align: center;
  border-radius: 10px;
  background-color: var(--color-darkwhite);
`;

const ContentsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 96%;
  height: 30rem;
  margin: 5px;
  background-color: var(--color-darkwhite);
  border-radius: 10px;
  text-align: center;
  font-size: 2rem;
`;

export const AllianceBox = styled.div`
  min-width: 96%;
  height: 70%;
  display: flex;
  justify-content: space-around;
  border-radius: 10rem;
  align-items: center;
  text-align: center;
  margin: 10px;
`;

 const MyDogImgs = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: auto 5px;
`;

const JoinBtn = styled.button`
  border: 1px solid var(--color-mainviolet--50);
  border-radius: 1rem;
  width: 20rem;
  height: 2rem;
  font-size: 20px;
  cursor: pointer;
  margin: 2px;
  :hover {
    background-color: ${(props) =>
      props.disabled ? '' : 'var(--color-mainviolet--25)'};
    color: ${(props) => (props.disabled ? '' : 'var(--color-darkwhite)')};
  }
  &.active {
    background-color: var(--color-mainviolet--25);
    color: var(--color-darkwhite);
  }
`;

const CancelBtn = styled.button`
  border: 1px solid var(--color-mainviolet--50);
  border-radius: 1rem;
  width: 20rem;
  height: 2rem;
  font-size: 20px;
  cursor: pointer;
  margin: 2px;
  :hover {
    background-color: ${(props) =>
      props.disabled ? '' : 'var(--color-mainviolet--25)'};
    color: ${(props) => (props.disabled ? '' : 'var(--color-darkwhite)')};
  }
  &.active {
    background-color: var(--color-mainviolet--25);
    color: var(--color-darkwhite);
  }
`;

const LeaveButton = styled.button`
  border: 1px solid var(--color-mainviolet--50);
  border-radius: 1rem;
  width: 20rem;
  height: 2rem;
  font-size: 20px;
  cursor: pointer;
  margin: 2px;
  :hover {
    background-color: ${(props) =>
      props.disabled ? '' : 'var(--color-mainviolet--25)'};
    color: ${(props) => (props.disabled ? '' : 'var(--color-darkwhite)')};
  }
  &.active {
    background-color: var(--color-mainviolet--25);
    color: var(--color-darkwhite);
  }
`;

const PermissionBox = styled.ul`
  width: 300px;
  padding: 10px;
`;

const PermissionList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 1.5rem;
  box-shadow: 1px 1px 3px gray;
  padding: 5px;
  margin: 10px;
`;

const ToggleDogListContainer = styled.ul`
  display: ${(props) => (props.toggled ? 'block' : 'none')};
  width: 280px;
  margin: 0px;
`;

const ToggleDogList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  flex-direction: row;
  padding: 5px;
  margin: 10px;
`;

const UserImg = styled.img`
  width: 3rem;
  height: 3rem;
  max-width: 100%;
  border-radius: 50%;
  object-fit: fill;
`;

const DogImg = styled.img`
  width: 3rem;
  height: 3rem;
  max-width: 100%;
  border-radius: 50%;
  object-fit: fill;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const AcceptBtn = styled.button`
  background-color: ${(props) =>
    props.selected ? 'var(--color-mainviolet--25)' : ''};
  color: ${(props) => (props.selected ? 'var(--color-darkwhite)' : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-mainviolet--50);
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
  font-size: 20px;
  cursor: pointer;
  margin: 2px;
  :hover {
    background-color: ${(props) =>
      props.disabled ? '' : 'var(--color-mainviolet--25)'};
    color: ${(props) => (props.disabled ? '' : 'var(--color-darkwhite)')};
  }
  &.active {
    background-color: var(--color-mainviolet--25);
    color: var(--color-darkwhite);
  }
`;

const DenyBtn = styled.button`
  background-color: ${(props) =>
    props.selected ? 'var(--color-mainviolet--25)' : ''};
  color: ${(props) => (props.selected ? 'var(--color-darkwhite)' : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-mainviolet--50);
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
  font-size: 20px;
  cursor: pointer;
  margin: 2px;
  :hover {
    background-color: ${(props) =>
      props.disabled ? '' : 'var(--color-mainviolet--25)'};
    color: ${(props) => (props.disabled ? '' : 'var(--color-darkwhite)')};
  }
  &.active {
    background-color: var(--color-mainviolet--25);
    color: var(--color-darkwhite);
  }
`;

const DogList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 1.5rem;
  box-shadow: 1px 1px 3px gray;
  padding: 5px;
  margin: 10px;
`;

const MyDogsContainer = styled.ul`
  width: 300px;
  padding: 10px;
  overflow-y: auto;
`;

const GathCrewBox = styled.div`
  display: block;
  align-items: center;
  width: 20rem;
  height: 55px;
  margin: 1rem 2rem;
  cursor: pointer;
  background-color: var(--color-darkwhite);
  border-radius: 1rem;
  justify-content: space-around;

  ${media.lessThan('medium')`
      width: 738px;
  `}
`;

const MapBox = styled.div`
  width: auto;
  height: 100%;
  border: 1rem solid var(--color-mainviolet--100);
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MapBoxAddres = styled.div`
  background-color: var(--color-darkwhite);
  width: 25rem;
  height: 3rem;
  margin: 0.5rem;
  text-align: center;
  padding: 1rem;
  font-size: 1.3rem;
  font-family: "BlackHanSans-Regular"
  box-shadow: 1.5px 1.5px var(--color-darkgray);
`;

const ErrMsg = styled.div`
  color: red;
`;

const MeetingTimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 96%;
  height: 15rem;
  margin: 5px;
  background-color: var(--color-darkwhite);
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
`;

const ComMapBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// styled-component Boundary
const Oneroom = () => {
  const params = useParams();
  
  const [, , removeCookie] = useCookies();
  const dispatch = useDispatch();
  const [roomDetail, setRoomDetail] = useState({}); // ??? ??????
  const [myDogs, setMyDogs] = useState([]); // ????????? ????????? ??????
  const [selectedDogs, setSelectedDogs] = useState([]); // ????????? ????????? ????????? ????????? ????????? ??????
  const [toggle, setToggle] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const history = useHistory();
  // const [isOpenCom, setIsOpenCom] = useState(false);
  // const [noDog, setNoDog] = useState(true);

  const handleButtonClickJoin = async () => {
    const request_time = new Date();
    const result = await roomApi.joinRoomApi(
      params.room_id,
      [...myDogs.filter((_, idx) => selectedDogs[idx])],
      request_time
    );
    console.log('result.status: ', result.status);
    if (result.status === 200) {
      console.log('result.data.data: ', result.data.data);
      if (result.data.data === 'meeting time is over') {
        console.log('result.data.data: ', result.data.data);
        setErrMsg('1');
        console.log('errMsg: ', errMsg);
      } else if (result.data.data === 'you sent no dog') {
        setErrMsg('2');
        console.log('errMsg2: ', errMsg);
      } else {
        console.log('selectedDogs: ', selectedDogs);
        setRoomDetail(
          Object.assign({}, { ...roomDetail }, { isJoinRequested: true })
        );
        setErrMsg('0');
        console.log('errMsg3: ', errMsg);
      }
    } else {
      console.log('status code not 200');
    }
  };

  const handleClickReqCancel = async () => {
    const result = await roomApi.cancelRoomApi(params.room_id);

    if (result.status === 200) {
      setRoomDetail(
        Object.assign({}, { ...roomDetail }, { isJoinRequested: false })
      );
    }
  };

  const handleClickPermissionBtn = async (e, id, code) => {
    e.stopPropagation();

    if (code === 1) {
      // (??????) ???????????? ?????? ??????
      // ????????? permission true
      // ???????????? 200
      // roomDetail ?????? ?????????.
      await roomApi
        .reqPermissionApi(id, params.room_id, true)
        .then(async (result) => {
          if (result.status === 200) {
            const resRoom = await roomApi.roomDetailApi(params.room_id);
            console.log(resRoom);

            setRoomDetail(Object.assign({}, { ...resRoom.data.data }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (code === 2) {
      // (??????) ???????????? ?????? ??????
      // ????????? permission false
      // ???????????? 200
      // roomDetail ?????? ?????????.
      await roomApi
        .reqPermissionApi(id, params.room_id, false)
        .then(async (result) => {
          if (result.status === 200) {
            const resRoom = await roomApi.roomDetailApi(params.room_id);
            console.log(resRoom);

            setRoomDetail(Object.assign({}, { ...resRoom.data.data }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (code === 3) {
      // (?????????) ??????
      setSelectedDogs([
        ...selectedDogs.map((el, idx) => {
          return myDogs[idx].id === id ? true : el;
        })
      ]);
      // for (let i = 0; i < selectedDogs.length; i++) {
      //   if (selectedDogs[i]) {
      //     setNoDog(false);
      //   }
      // }
    } else {
      // (?????????) ??????
      setSelectedDogs([
        ...selectedDogs.map((el, idx) => {
          return myDogs[idx].id === id ? false : el;
        })
      ]);
      // for (let i = 0; i < selectedDogs.length; i++) {
      //   if (selectedDogs[i]) {
      //     setNoDog(false);
      //   }
      // }
    }
  };

  const handleToggleOn = () => {
    setToggle(!toggle);
  };

  const handleClickLeave = async () => {
    const result = await roomApi.deleteRoomApi(params.room_id);
    if (result.status === 200) {
      setRoomDetail(
        Object.assign(
          {},
          { ...roomDetail },
          { isJoinRequested: false, isJoined: false }
        )
      );
    }
  };

  // const handleOpenComment = () => {
  //   setIsOpenCom(!isOpenCom);
  // };

  const handleSetRoomDetail = (info) => {
    setRoomDetail(info);
    console.log('info: ', info);
    const meeting_time = info.meeting_time;

    setDate(meeting_time.split('T')[0]);
    const time_array = meeting_time.split('T')[1].split('.')[0].split(':');
    setTime(time_array[0] + ':' + time_array[1]);
  };
  useEffect(() => {

    const initFunction = async () => {
      window.scrollTo(0, 0);

      const userData = localStorage.getItem('userData');

      if(userData) {
        const localData = JSON.parse(userData);
        await check.checkApi({
          cookies: localData.cookies,
        })
        .then(res => {
          if(res.data.data) {
            // ????????? ????????? ??????
            localStorage.setItem('userData', JSON.stringify({ ...res.data.data }))
            const userData = JSON.parse(localStorage.getItem('userData'));
            delete userData.cookies;
            dispatch(signinAction(userData));
          }
          else {
            // ?????? ????????? ??????
            const userData = JSON.parse(localStorage.getItem('userData'));
            delete userData.cookies;
            dispatch(signinAction(userData));
          }
        })
        .catch(err => {
          localStorage.clear();
          removeCookie('accessToken');
          removeCookie('refreshToken');
          dispatch(signoutAction());
          window.location.assign('https://walkingdogs.link')
        })
      }

      const resRoom = await roomApi.roomDetailApi(params.room_id);
      // console.log(resRoom);
  
      // setRoomDetail(Object.assign({}, { ...resRoom.data.data }))
      handleSetRoomDetail(Object.assign({}, { ...resRoom.data.data }));
      const resDog = await mypage.dogListApi();
      // console.log(resDog);
  
      setMyDogs([...resDog.data.dogs]);
      setSelectedDogs(new Array(resDog.data.dogs.length).fill(false));
    }

    initFunction();

  }, []);

  return (
    <>
      <OneroomContainer>
        <OneroomBox>
          <RoomBox>
            <ImageBox src={roomDetail.image} />
            <RoominfoBox>
              <UsernameBox className="username">
                {roomDetail.username}
              </UsernameBox>
              <ContentsBox className="address">{roomDetail.title}</ContentsBox>
              <MeetingTimeBox>
                ????????? ??????: {date} , ????????? ??????: {time}
              </MeetingTimeBox>
              <AllianceBox>
                <span
                  className="alliance_ment"
                  style={{
                    display: 'flex',
                    height: '40px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '25px',
                    margin: '0 5px'
                  }}
                >
                  ?????? ?????? ???????????? ?????????????
                </span>
                <GathCrewBox>
                  {roomDetail.dogs !== undefined &&
                    roomDetail.dogs.map((el) => {
                      return <MyDogImgs key={el.id} src={el.image} />;
                    })}
                </GathCrewBox>
              </AllianceBox>
            </RoominfoBox>
          </RoomBox>
        </OneroomBox>

        {roomDetail.isJoined ? (
          roomDetail.isLeader ? (
            <PermissionBox>
              {roomDetail.reqUsers.map((el) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      padding: '0px'
                    }}
                  >
                    <PermissionList key={el.id} onClick={handleToggleOn}>
                      {' '}
                      {/*????????? ?????????*/}
                      <UserImg src={el.image} />
                      <span style={{ pointerEvents: 'none' }}>
                        {el.username}
                      </span>
                      <BtnContainer>
                        <AcceptBtn
                          onClick={(e) => handleClickPermissionBtn(e, el.id, 1)}
                        >
                          <span className="material-icons">done</span>
                        </AcceptBtn>
                        <DenyBtn
                          onClick={(e) => handleClickPermissionBtn(e, el.id, 2)}
                        >
                          <span className="material-icons">close</span>
                        </DenyBtn>
                      </BtnContainer>
                    </PermissionList>
                    <ToggleDogListContainer toggled={toggle}>
                      {el.dogs.map((dog) => (
                        <ToggleDogList key={dog.id}>
                          <DogImg src={dog.image} />
                          {dog.name}
                        </ToggleDogList>
                      ))}
                    </ToggleDogListContainer>
                  </div>
                );
              })}
            </PermissionBox>
          ) : (
            <LeaveButton onClick={handleClickLeave}>?????? ?????????</LeaveButton>
          )
        ) : roomDetail.isJoinRequested ? (
          <RoomBtnBox>
            <JoinBtn disabled={true}>????????????</JoinBtn>
            <CancelBtn onClick={handleClickReqCancel}>????????????</CancelBtn>
          </RoomBtnBox>
        ) : (
          <>
            <RoomBtnBox>
              <JoinBtn onClick={handleButtonClickJoin}>????????????</JoinBtn>
            </RoomBtnBox>
            {errMsg === '1' ? (
              <ErrMsg>"?????? ????????? ???????????????."</ErrMsg>
            ) : errMsg === '2' ? (
              <ErrMsg>"???????????? ????????? ???????????? ?????????"</ErrMsg>
            ) : null}
            <MyDogsContainer>
              {myDogs.map((el, idx) => (
                <DogList key={el.id}>
                  <DogImg src={el.image} />
                  {el.name}
                  <BtnContainer>
                    <AcceptBtn
                      selected={selectedDogs[idx]}
                      onClick={(e) => handleClickPermissionBtn(e, el.id, 3)}
                    >
                      <span className="material-icons">done</span>
                    </AcceptBtn>
                    <DenyBtn
                      selected={!selectedDogs[idx]}
                      onClick={(e) => handleClickPermissionBtn(e, el.id, 4)}
                    >
                      <span className="material-icons">close</span>
                    </DenyBtn>
                  </BtnContainer>
                </DogList>
              ))}
            </MyDogsContainer>
          </>
        )}
      </OneroomContainer>
      <ComMapBox>
        <Comments roomId={params.room_id} />
        <MapBox>
          <MapBoxAddres> {roomDetail.address} </MapBoxAddres>
          <Roommap
            latitude={roomDetail.latitude}
            longitude={roomDetail.longitude}
            draggable={false}
          />
        </MapBox>
      </ComMapBox>
    </>
  );
};

export default Oneroom;
