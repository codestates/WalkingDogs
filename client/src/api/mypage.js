import api from './index';



// ! 패드워드 모달이 완성된 뒤에 확인

const mypage = {

  dogListApi: async () => {
    const result = await api({
      method: 'GET',
      url: `/dog-list`,
    });
    return result;
  },

  myroomApi: async () => {
    const result = await api({
      method: 'GET',
      url: `/myroom`,
    });
    return result;
  },

  passwordApi: async userInfo => {
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
  },

  profileApi: async userInfo => {
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
  },
}

export default mypage;
