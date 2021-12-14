import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Roommap from '../Components/Roommap';
import Comments from '../Components/Comments';
import room from '../api/room';
import {useDispatch, useSelector} from 'react-redux'
import {gatherCrewModalOnAction, modalOffAction} from '../store/actions';

export const OneroomContainer = styled.div`
  width: auto;
  height: 50rem;
  margin: 0.1rem
  border-radius: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1rem solid var(--color-mainviolet--100);
`;

const OneroomBox = styled.div`
  border-radius: 10px;
`

const RoomBox = styled.div`
  display: flex;
  min-width: 100rem;
  height: 25rem;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px gray;
`;

const RoomBtnBox = styled.div`
  display: flex;
  min-width: auto;
  height: auto;
  margin: 10px;
  justify-content: space-around;
`;

const ImageBox = styled.div`
  border: 0.1rem solid grey;
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

export const UsernameBox = styled.div`
  min-width: 30%;
  height: 30px;
  margin: 10px;
  text-align: center;
`;

export const ContentsBox = styled.div`
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
  border-radius:10rem;
  align-items: center;
  text-align: center;
  margin: 10px;
  :hover{
    box-shadow: 1px 1px var(--color-darkgray);
  }
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

const CancelBtn = styled.button`
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

const DogSelectBox = styled.div`

`

const DogList = styled.li`


`

const GathCrewBox = styled.div`
  width: 50%;
  height: 55px;
  margin: 5px 10px;
  cursor: pointer;
  background-color: var(--color-darkwhite);
  border-radius: 1rem;
  justify-content: space-between;
`

const MapBox = styled.div`
  width: auto;
  height: 100%;
  border: 1rem solid var(--color-mainviolet--100);
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MapBoxAddres = styled.div`
  background-color: var(--color-mainviolet--25);
  width: 25rem;
  height: 3rem;
  margin: 0.5rem;
  text-align: center;
  padding: 1rem;
  box-shadow: 1.5px 1.5px var(--color-darkgray);
`

// styled-component Boundary
const Oneroom = () => {
  const params = useParams();
  const [isOpenCom, setIsOpenCom] = useState(false);
  const [roomDetail, setRoomDetail] = useState({});
  const [isGatherJoin, setIsGatherJoin] = useState(false);
  const [gathCrew, setGathCrew] = useState([]);

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
    console.log(result);

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
        <OneroomBox>
        <RoomBox>
          <ImageBox src={roomDetail.image} />
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
                {gathCrew.map((el)=> {
                  return <OtherUserImg key={el.id}/>
                })}
                
                {/* <OtherUserImg />
                <OtherUserImg />
                <OtherUserImg /> */}
              </GathCrewBox>
            </AllianceBox>
          </RoominfoBox>
        </RoomBox>
        </OneroomBox>
        
        {roomDetail.isJoined ?
            <></>
        :
            roomDetail.isJoinRequested ?
                <RoomBtnBox>
                    <JoinBtn disabled={true}>신청완료</JoinBtn>
                    <CancelBtn>신청취소</CancelBtn>
                </RoomBtnBox>
            :
              <>
                <RoomBtnBox>
                    <JoinBtn onClick={handleButtonClickJoin}>참여하기</JoinBtn>
                </RoomBtnBox>
                <DogSelectBox>
                    <DogList>
                      1
                    </DogList>
                </DogSelectBox>
              </>
        }
      </OneroomContainer>
      <Comments roomId={params.room_id} />
      <MapBox>
        <MapBoxAddres> {roomDetail.address} </MapBoxAddres>
        <Roommap 
          latitude={roomDetail.latitude} 
          longitude={roomDetail.longitude} 
          draggable={false}/>
      </MapBox>
    </>
  );
};

export default Oneroom;