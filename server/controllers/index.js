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
    doglist: require('./mypage/dog-list'),
    myroom: require('./mypage/myroom'),
    password: require('./mypage/password'),
    profile: require('./mypage/profile'),
  },
  room: {
    create: require('./room/create'),
    info: require('./room/info'),
    join: require('./room/join'),
  },
  map: {},
};
