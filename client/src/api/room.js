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

const roomDetailApi = async (roomId) => {
  const result = await api({
    method: 'GET',
    url: `/room/${roomId}`,
  });
  return result;
};

const joinRoomApi = async (roomId) => {
  const result = await api({
    method: 'PUT',
    url: `/room/${roomId}/join`,
  });
  return result;
};

const roomInfoApi = async (roomId) => {
  const result = await api({
    method: 'GET',
    url: `room/${roomId}`
  })
  return result;
}

const deleteRoomApi = async (roomId) => {
  const result = await api({
    method: 'DELETE',
    url: `room/${roomId}`
  })
  return result;
}

export default { newRoomApi, roomDetailApi, joinRoomApi, roomInfoApi, deleteRoomApi };
