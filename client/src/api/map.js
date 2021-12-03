import api from './index';

const locationApi = async () => {
  const result = await api({
    method: 'GET',
    url: `/location`,
  });
  return result;
};

export default { locationApi };
