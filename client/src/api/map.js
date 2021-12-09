import api from './index';

const locationApi = async (params = { latitude: 37.702950, longitude: 126.807007 }) => {
  const result = await api({
    method: 'GET',
    url: `/location`,
    params,
  });
  return result;
};

export default { locationApi };
