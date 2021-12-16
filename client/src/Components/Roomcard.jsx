import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import room from '../api/room';
import PropTypes from 'prop-types';
import UserIcon from './UserIcon';
import { signinModalOnAction } from '../store/actions';

const CardContainer = styled.div`
  border: 0.5rem solid var(--color-mainviolet--25);
  border-radius: 1rem;
  background-color: var(--color-mainviolet--25);
  filter: drop-shadow(2px 2px 6px lightgray);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* max-width: 25rem; */
  min-width: 21rem;
  > * {
    margin-bottom: 1.15rem;
  }
  .divider {
    margin: 0 0.4em 0.1em;
    overflow: hidden;
  }
  position: relative;
  cursor: pointer;
  :hover {
    box-shadow: 1px 1px lightgray;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
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
  width: 12rem;
  height: 30px;
  margin: 5px;
  text-align: center;
  border-radius: 10px;
  background-color: var(--color-darkwhite);
`;

const LeaderImage = styled.img`
  position: absolute;
  max-width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const RoomTitleBox = styled.div`
  width: 13rem;
  height: 2.5rem;
  margin: 3px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--color-darkwhite);
`;

const TimeBox = styled.div`
  width: 13rem;
  height: 2.5rem;
  margin: 3px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--color-darkwhite);
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
  background-color: var(--color-darkwhite);
`;
//styled-component boundary

const Roomcard = ({ listKey, room }) => {
  const [leaderInfo, setLeaderInfo] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const { isLogin } = useSelector(({ authReducer }) => authReducer);
  const { isCreateGatherModal } = useSelector(
    ({ modalReducer }) => modalReducer
  );
  const dispatch = useDispatch();
  const handleGathDetailRoomModalOn = () => {
    // if(!isCreateGatherModal) dispatch(createGatherRoomDetailModalOnAction(gathering));
  };

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
          <div>모이는 날짜: {date}</div>
          <div>모이는 시간: {time}</div>
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
