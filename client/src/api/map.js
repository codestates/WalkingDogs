import api from './index';

const locationApi = async () => {
  const result = await api({
    method: 'GET',
    url: `/location`,
    params:{
      latitude:42.53059957720707,
      //
      longitude:-34.513692434871814
      //
    }
  });
  return result;
};

export default { locationApi };
