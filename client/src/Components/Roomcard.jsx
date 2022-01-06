import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { signinModalOnAction } from '../store/actions';
import {gsap} from 'gsap';




const CardContainer = styled.div`
    border: 0.2rem solid var(--color-lightpurple);
    border-radius: 1rem;
    background-color: var(--color-darkwhite);
    /* filter: drop-shadow(2px 2px 6px lightgray); */
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    min-width: 13rem;
    > * {
        margin-bottom: 1.15rem;
    }
    .inline{
        justify-content: center
        border: 1px solid var(--color-darkwhite);
    }
    .divider {
        margin: 0 0.4em 0.1em;
        overflow: hidden;
    }
    position: relative;
    cursor: pointer;
    :hover{
        box-shadow: 1px 1px lightgray;
    }
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0px;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Roominfo = styled.div`
  width: 14rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

const AddressesBox = styled.div`

    width: 14rem;
    height: 4.3rem;
    margin: 0.2rem;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    background-color: var(--color-mainviolet--50);
    color: var(--color-darkwhite);
`

const LeaderImage = styled.img`
  position: absolute;
  max-width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const RoomTitleBox = styled.div`
  width: 13rem;
  height: 2.1rem;
  margin: 0.5rem;
  text-align: center;
  border-radius: 10px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--color-mainviolet--50);
  color: var(--color-darkwhite);
`;

const TimeBox = styled.div`
  width: 13rem;
  height: 2.7rem;
  margin: 0.3rem;
  padding: 0.1rem;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--color-mainviolet--10);
  color: var(--color-darkwhite);
  
  >.date{
    text-align: space-evenly;
    border-radius: 1rem;
    color: var(--color-black);
    font-weight: bold;
    margin: 0.1rem;
  }

  >.time{
    margin-top: 0.1rem;
    text-align: center;
    font-weight: bold;
  }
`;


const NumberBox = styled.div`
  width: 13rem;
  height: 2.5rem;
  margin: 3px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--color-hotstone);
`;
//styled-component boundary

const Roomcard = ({ listKey, room }) => {
  const [leaderInfo, setLeaderInfo] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const { isLogin } = useSelector(({ authReducer }) => authReducer);
  // const { isCreateGatherModal } = useSelector(
  //   ({ modalReducer }) => modalReducer
  // );
  const dispatch = useDispatch();
  // const handleGathDetailRoomModalOn = () => {
    // if(!isCreateGatherModal) dispatch(createGatherRoomDetailModalOnAction(gathering));
  // };

  const handleRoomInfo = (meeting_time) => {
    setDate(meeting_time.split('T')[0]);
    const time_array = meeting_time.split('T')[1].split('.')[0].split(':');
    setTime(time_array[0] + ':' + time_array[1]);
  };

  useEffect(() => {
    if (room) {
      const leaderId = room.leader_id;
      const leader = room.user_rooms.filter((el) => el.user_id === leaderId)[0]
        .user;
      setLeaderInfo({ ...leader });
      handleRoomInfo(room.meeting_time);
    }
  }, [room]);

  return (
    <CardContainer
      className="cardContainer"
      key={listKey}
      onClick={() => {
        if (isLogin) window.location.assign(`/room/${listKey}`);
        else dispatch(signinModalOnAction());
      }}
    >
      <ImageBox>
        <LeaderImage
          src={leaderInfo.image}
          style={{ maxWidth: '100%', height: '100%', display: 'block' }}
        />
      </ImageBox>
      <Roominfo>
        <AddressesBox> {room.address} </AddressesBox>
        <RoomTitleBox>{room.title}</RoomTitleBox>
        <TimeBox>
          <div className='date'>모이는 날짜: {date}</div>
          <div className='time'>모이는 시간: {time}</div>
        </TimeBox>
        <NumberBox>정원: {room.member_limit}명</NumberBox>
      </Roominfo>
    </CardContainer>
  );

};

Roomcard.propTypes = {
  gathering: PropTypes.exact({
    id: PropTypes.number,
    address: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    timeDesctiption: PropTypes.string,
    totalNum: PropTypes.number,
    currentNum: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    done: PropTypes.bool,
    creator: PropTypes.exact({
      id: PropTypes.string,
      username: PropTypes.string,
      image: PropTypes.string
    }),
    user: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        username: PropTypes.string,
        image: PropTypes.string
      })
    ),
    areaName: PropTypes.string,
    placeName: PropTypes.string
  })
};

export default Roomcard;
