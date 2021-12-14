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

// ! 패드워드 모달이 완성된 뒤에 확인
const passwordApi = async userInfo => {
  const result = await api({
    method: 'POST',
    url: `/password`,
    data: {
      old_password: userInfo.old_password,
      new_password: userInfo.new_password,
      new_password_check: userInfo.new_password_check,
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
