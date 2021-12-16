import api from './index';

const map = {
  locationApi: async (params) => {
    const result = await api({
      method: 'GET',
      url: `/location`,
      params,
    });
    return result;
  },
}

export default map;
