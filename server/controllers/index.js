module.exports = {
  user: {
    login: require('./user/login'),
    logout: require('./user/logout'),
    signup: require('./user/signup'),
  },
  oauth: {
    kakao: require('./oauth/kakao'),
    google: require('./oauth/google'),
  },
  mypage: {
    dogList: require('./mypage/dogList'),
    myroom: require('./mypage/myroom'),
    password: require('./mypage/password'),
    profile: require('./mypage/profile'),
  },
  room: {
    joinRoom: require('./room/joinRoom'),
    newRoom: require('./room/newRoom'),
    roomInfo: require('./room/roomInfo'),
  },
  map: {},
};
