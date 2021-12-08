import api from './index';

const newCommentApi = async (room_id, message) => {
  const result = await api({
    method: 'POST',
    url: `/comment`,
    data: {
      room_id,
      message,
    },
  });

  return result;
};

const getCommentApi = async (room_id) => {
  const result = await api({
    method: 'GET',
    url: `/comment`,
    params: {
      room_id,
    }
  });

  return result;
};

export default { newCommentApi, getCommentApi };
