import api from './index';

const comment = {
  newCommentApi: async (room_id, message) => {
    const result = await api({
      method: 'POST',
      url: `/comment`,
      data: {
        room_id,
        message,
      },
    });
    return result;
  },

  getCommentApi: async (room_id) => {
    const result = await api({
      method: 'GET',
      url: `/comment`,
      params: {
        room_id,
      }
    });
  
    return result;
  },

  modifyCommentApi: async (comment_id, message) => {
    const result = await api({
      method: 'PUT',
      url: '/comment',
      data: {
        comment_id,
        message,
      },
    })
  
    return result
  },

  deleteCommentApi: async (comment_id) => {
    const result = await api({
      method: 'DELETE',
      url: '/comment',
      data: {
        comment_id,
      },
    })
  
    return result
  },

}

export default comment;
