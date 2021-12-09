import api from './index';

const locationApi = async (params = { latitude: 37.566936, longitude: 126.997322 }) => {
  const result = await api({
    method: 'GET',
    url: `/location`,
    params,
  });
  return result;
};

export default { locationApi };
