require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = {
  generateAccessToken: data => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  },

  // // 테스트용
  // generateAccessToken: data => {
  //   return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1m' });
  // },

  generateRefreshToken: (data) => {
    return sign(data, process.env.ACCESS_REFRESH, { expiresIn: '7d' });
  },

  // // 테스트용
  // generateRefreshToken: data => {
  //   return sign(data, process.env.ACCESS_REFRESH, { expiresIn: '7d' });
  // },

  sendAccessToken: (res, accessToken) => {
    const now = new Date();
    const expires = now.setHours(now.getHours() + 1);
    return res.cookie('accessToken', accessToken, {
      secure: true,
      sameSite: 'none',
      expiresIn: expires,
    });
  },

  sendRefreshToken: (res, refreshToken) => {
    const now = new Date();
    const expires = now.setDate(now.getDate() + 7);
    return res.cookie('refreshToken', refreshToken, {
      secure: true,
      sameSite: 'none',
      expiresIn: expires,
    });
  },

  isAuthorized: async req => {
    // const { generateAccessToken, generateRefreshToken } = require('./tokenFunctions')

    
    const generateAccessToken = (data) => {
      return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
    }
    
    const generateRefreshToken = (data) => {
      return sign(data, process.env.ACCESS_REFRESH, { expiresIn: '7d' });
    }

    // JWT 토큰이 전달되지 않은 경우
    if (!req.cookies['accessToken']) {
      return null;
    }

    // 전달받은 JWT 토큰
    const accessToken = req.cookies['accessToken'];

    // 토큰 정보
    let result = await verify(accessToken, process.env.ACCESS_SECRET, async (err, decoded) => {
      if (err) {
        if (!req.cookies['refreshToken']) {
          return err;
        } else {
          const refreshToken = req.cookies['refreshToken'];
          const refreshInfo = await verify(refreshToken, process.env.ACCESS_REFRESH, (error, decoded) => {
            if (error) {
              return error;
            } else {
              console.log(decoded);
              delete decoded.iat;
              delete decoded.exp;
              const newAccessToken= generateAccessToken(decoded)
              const newRefreshToken= generateRefreshToken(decoded);
              return { accessToken: newAccessToken, refreshToken: newRefreshToken };
            }
          })
          // .then((result) => {
          //   return result;
          // })
          // .catch((err) => {
          //   return err;
          // })

          if (refreshInfo instanceof Error) {
            return err;
          } else {
            return refreshInfo;
          }
        }
      }
      else {
        return decoded
      }
    });

    if (result instanceof Error) {
      return null;
    }

    if(result.accessToken || result.refreshToken) {
      result = await verify(result.accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
        if(err) {
          return err;
        } else {
          return Object.assign({}, {...result}, {...decoded})
        }
      });
    }

    if (result instanceof Error) {
      return null;
    }

    return { ...result }
  },
};

//-------------------------------------------------
// 수정 전 코드
//-------------------------------------------------

// require('dotenv').config();
// const { sign, verify } = require('jsonwebtoken');

// module.exports = {
//   generateAccessToken: data => {
//     return sign(data, process.env.ACCESS_SECRET, { expiresIn: '3h' });
//   },

//   generateRefreshToken: data => {
//     return sign(data, process.env.ACCESS_REFRESH, { expiresIn: '7d' });
//   },

//   sendAccessToken: (res, accessToken) => {
//     const now = new Date()
//     const expires = now.setHours(now.getHours() + 1)
//     return res.cookie('jwt', accessToken, {
//       secure: true,
//       sameSite: "none",
//       expiresIn: expires,
//     });
//   },

//   isAuthorized: async req => {
//     // JWT 토큰이 전달되지 않은 경우
//     if (!req.cookies['jwt']) {
//       return null;
//     }

//     // 전달받은 JWT 토큰
//     const accessToken = req.cookies['jwt'];

//     // 토큰 정보
//     const result = await verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
//       if(err)
//         return err
//       else
//         return decoded
//     });

//     if (result instanceof Error) {
//       return null;
//     }

//     return { ...result }
//   },
// };
