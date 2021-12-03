import api from './index';

const dogListApi = async () => {
  const result = await api({
    url: `/dog-list`,
  });
  return result;
};

const myroomApi = async () => {
  const result = await api({
    url: `/myroom`,
  });
  return result;
};

const passwordApi = async userInfo => {
  const result = await api({
    method: 'POST',
    url: `/password`,
    data: {
      old_password: userInfo.old_password,
      new_paassword: userInfo.new_paassword,
      new_paassword_check: userInfo.new_paassword_check,
    },
  });
  return result;
};

const profileApi = async userInfo => {
  const result = await api({
    method: 'PATCH',
    url: `/profile`,
    data: {
      username: userInfo.username,
      dogs: [...userInfo.dogs],
      image: userInfo.image,
    },
  });
  return result;
};

export default { dogListApi, myroomApi, passwordApi, profileApi };
