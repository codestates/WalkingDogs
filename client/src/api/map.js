import api from './index';

const locationApi = async (params = { latitude: '37.643589', longitude: '126.869263' }) => {
  const result = await api({
    method: 'GET',
    url: `/location`,
    params,
  });
  return result;
};

export default { locationApi };
