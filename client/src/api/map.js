import api from './index';

const locationApi = async (params = { latitude: '37.61228142890456', longitude: '-126.37612861335073' }) => {
  const result = await api({
    method: 'GET',
    url: `/location`,
    params,
  });
  return result;
};

export default { locationApi };
