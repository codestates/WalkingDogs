import api from '.';

require('dotenv').config();

const auth = {
  googleApi: async (authorizationCode) => {
      const result = await api({
      method: 'POST',
      url: `/google`,
      data: {
          authorizationCode,
        },
    });
    return result;
  },
  
  kakaoApi: async (authorizationCode) => {
    const result = await api({
      method: 'POST',
      url: `/kakao`,
      data: {
        authorizationCode,
      },
    });
    return result;
  },
}

export default auth