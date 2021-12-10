import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Roommap from '../Components/Roommap';
import Comments from '../Components/Comments';
import room from '../api/room';
import {useDispatch, useSelector} from 'react-redux'
import {gatherCrewModalOnAction, modalOffAction} from '../store/actions';


export const OneroomContainer = styled.div`
  border: 1px solid #000000;
  width: auto;
  height: 50rem;
  margin: 10px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RoomBox = styled.div`
  border: 1px solid green;
  display: flex;
  min-width: 100rem;
  height: 25rem;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
`;

const RoomBtnBox = styled.div`
  display: flex;
  min-width: auto;
  height: auto;
  margin: 10px;
  justify-content: space-around;
`;

export const ImageBox = styled.div`
  border: 1px solid black;
  width: 20%;
  height: 70%;
  border-radius: 50%;
  object-fit: fill;
`;

export const RoominfoBox = styled.div`
  border: 1px solid black;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

export const UsernameBox = styled.div`
  border: 1px solid green;
  min-width: 30%;
  height: 30px;
  margin: 5px;
`;

export const ContentsBox = styled.div`
  border: 1px solid #000000;
  min-width: 96%;
  height: 30rem;
  margin: 5px;
`;

export const AllianceBox = styled.div`
  border: 1px solid green;
  min-width: 96%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

export const OtherUserImg = styled.img`
  border: 1px solid #000000;
  min-width: 50px;
  min-height: 48px;
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
  :hover{
    background-color: ${props => props.disabled ? '' : 'var(--color-mainviolet--25)'};
    color: ${props => props.disabled ? '' : 'var(--color-darkwhite)'};
  }
  &.active{
    background-color: var(--color-mainviolet--25);
    color: var(--color-darkwhite);
  }

`;

const GathCrewBox = styled.div`
  border: 1px solid #000000;
  width: 50%;
  height: 55px;
  justify-content: flex-end;
  margin: 5px 10px;
  cursor: pointer;
`

// styled-component Boundary
const Oneroom = () => {
  const params = useParams();
  const [isOpenCom, setIsOpenCom] = useState(false);
  const [roomDetail, setRoomDetail] = useState({});
  const [isGatherJoin, setIsGatherJoin] = useState(false);

  const dispatch = useDispatch();
  const {isGatherCrewModal} = useSelector(({modalReducer}) => modalReducer);


  const handleCrewModalOpen = () => {
    dispatch(isGatherCrewModal())
  }

  const handleButtonClickJoin = async () => {
    const result = await room.joinRoomApi(params.room_id)
    
    if(result.status === 200) {
        setRoomDetail(Object.assign({}, { ...roomDetail }, { isJoinRequested: true }))
    }
  }

  const handleOpenComment = () => {
    setIsOpenCom(!isOpenCom);
  };

  useEffect(async () => {
    const result = await room.roomDetailApi(params.room_id);
    // console.log(result); room detail로 정보 가져오기 성공.

    setRoomDetail(Object.assign({}, { ...result.data.data }))
    
    // 들어오는 데이터

    // address: "address"
    // dogs: (2) [{…}, {…}]
    // image: "./test.img"
    // latitude: "37.57335637182507"
    // longitude: "-126.65122044622483"
    // title: "room23"
    // username: "name10"
    // users: (3) [{…}, {…}, {…}]
    // isJoined: false,
    // isJoinRequested: true,

  }, []);

  return (
    <>
      <OneroomContainer>
        <RoomBox>
          <ImageBox src="../puppy-test.jpeg" />
          <RoominfoBox>
            <UsernameBox className="username">
              {roomDetail.username}
            </UsernameBox>
            <ContentsBox className="address">
              {roomDetail.title}
            </ContentsBox>
            <AllianceBox>
              <span
                className="alliance_ment"
                style={{            
                  height: '40px',
                  justifyContent: 'center',
                  fontSize: '25px',
                  margin: '0 5px',
                }}
              >
                같이 가는 친구들은 누굴까요?
              </span>
              <GathCrewBox onClick={handleCrewModalOpen}>
                <OtherUserImg />
                <OtherUserImg />
                <OtherUserImg />
                <OtherUserImg />
              </GathCrewBox>
            </AllianceBox>
          </RoominfoBox>
        </RoomBox>
        
        {roomDetail.isJoined ?
            <></>
        :
            roomDetail.isJoinRequested ?
                <RoomBtnBox>
                    <JoinBtn disabled={true}>신청완료</JoinBtn>
                </RoomBtnBox>
            :
                <RoomBtnBox>
                    <JoinBtn onClick={handleButtonClickJoin}>참여하기</JoinBtn>
                </RoomBtnBox>
        }
      </OneroomContainer>
      <Comments roomId={params.room_id} />
      <Roommap address={roomDetail.address} latitude={roomDetail.latitude} longitude={roomDetail.longitude} draggable={false}/>
    </>
  );
};

export default Oneroom;