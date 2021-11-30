require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: data => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  },

  generateRefreshToken: data => {
    return sign(data, process.env.ACCESS_REFRESH, { expiresIn: '7d' });
  },

  sendAccessToken: (res, accessToken) => {
    return res.cookie('jwt', accessToken);
  },

  isAuthorized: req => {
    try {
      // JWT 토큰이 전달되지 않은 경우
      if (!req.cookies['jwt']) {
        throw err;
      }
      // 전달받은 JWT 토큰
      const accessToken = req.cookies['jwt'];
      // 토큰 정보 검증
      const decoded = verify(accessToken, process.env.ACCESS_SECRET);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};
