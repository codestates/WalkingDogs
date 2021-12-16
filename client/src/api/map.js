import api from './index';

const locationApi = async (params) => {
  const result = await api({
    method: 'GET',
    url: `/location`,
    params,
  });
  return result;
};

export default { locationApi };
