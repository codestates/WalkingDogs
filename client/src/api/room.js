import api from './index';

const roomApi = {
  newRoomApi: async roomInfo => {
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
  },

  roomDetailApi: async (roomId) => {
    const result = await api({
      method: 'GET',
      url: `/room/${roomId}`,
    });
    return result;
  },

  joinRoomApi: async (roomId, dogs, request_time) => {
    const result = await api({
      method: 'PUT',
      url: `/room/${roomId}/join`,
      data: {
        dogs,
        request_time,
      },
    });
    return result;
  },

  cancelRoomApi: async (roomId) => {
    const result = await api({
      method: 'PUT',
      url: `/room/${roomId}/cancel`,
    });
    return result;
  },

  reqPermissionApi: async (candidate_id, room_id, is_accepted) => {
    const result = await api({
      method: 'POST',
      url: `/reqPermission`,
      data: {
        candidate_id,
        room_id,
        is_accepted,
      }
    })
  
    return result
  },
  
  deleteRoomApi: async (roomId) => {
    const result = await api({
      method: 'DELETE',
      url: `room/${roomId}`
    })
    return result;
  },
}

export default roomApi;
