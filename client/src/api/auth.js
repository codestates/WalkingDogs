import api from '.';

require('dotenv').config();

const googleApi = async (authorizationCode) => {
    const result = await api({
    method: 'POST',
    url: `/google`,
    data: {
        authorizationCode,
      },
  });
  return result;
};

const kakaoApi = async (authorizationCode) => {
  const result = await api({
    method: 'POST',
    url: `/kakao`,
    data: {
      authorizationCode,
    },
  });
  return result;
};

export default { googleApi, kakaoApi };
