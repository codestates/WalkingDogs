import api from './index';

const newRoomApi = async roomInfo => {
  const result = await api({
    method: 'POST',
    url: `/new-room`,
    data: {
      latitude: roomInfo.latitude,
      longitude: roomInfo.longitude,
      address: roomInfo.address,
      selected_dogs: [...roomInfo.selected_dogs],
      room_title: roomInfo.room_title,
      member_limit: roomInfo.member_limit,
      meeting_time: roomInfo.meeting_time,
    },
  });
  return result;
};

const roomDetailApi = async () => {
  const result = await api({
    url: `/room/:room_id`,
  });
  return result;
};

const joinRoomApi = async roomInfo => {
  const result = await api({
    method: 'POST',
    url: `/room/:room_id/join`,
    data: {
      user_id: roomInfo.user_id,
      room_id: roomInfo.room_id,
    },
  });
  return result;
};

export default { newRoomApi, roomDetailApi, joinRoomApi };
