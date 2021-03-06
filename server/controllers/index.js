module.exports = {
  user: {
    login: require('./user/login'),
    logout: require('./user/logout'),
    signup: require('./user/signup'),
    userImage: require('./user/userImage'),
    dogImage: require('./user/dogImage'),
    check: require('./user/check'),
    withdrawal: require('./user/withdrawal'),
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
    reqPermission: require('./room/reqPermission'),
    request: require('./room/request'),
    cancelReq: require('./room/cancelReq'),
    deleteRoom: require('./room/deleteRoom'),
  },
  map: {
    location: require('./map/location'),
  },
  comment: {
    newComment: require('./comment/newComment'),
    allComment: require('./comment/allComment'),
    editComment: require('./comment/editComment'),
    deleteComment: require('./comment/deleteComment'),
  },
};
