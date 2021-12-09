import api from './index';

const locationApi = async (params = { latitude: '37.464024 ', longitude: '127.220146' }) => {
  const result = await api({
    method: 'GET',
    url: `/location`,
    params,
  });
  return result;
};

export default { locationApi };
