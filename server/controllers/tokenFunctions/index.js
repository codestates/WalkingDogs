require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: data => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '3h' });
  },

  generateRefreshToken: data => {
    return sign(data, process.env.ACCESS_REFRESH, { expiresIn: '7d' });
  },

  sendAccessToken: (res, accessToken) => {
    return res.cookie('jwt', accessToken);
  },

  isAuthorized:  async req => {
    // JWT 토큰이 전달되지 않은 경우
    if (!req.cookies['jwt']) {
      return null
    }

    // 전달받은 JWT 토큰
    const accessToken = req.cookies['jwt'];

    
    // 토큰 정보 
    const result = await verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
      if(err)
        return err
      else
        return decoded
    });
    console.log('isAuthorized함수 안', result);
    if (result instanceof Error) {
      return null;
    } 
    return { ...result }
  },
};
