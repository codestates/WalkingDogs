const { user } = require('../../models');

const {
  isAuthorized,
  sendAccessToken,
  sendRefreshToken,
} = require('../tokenFunctions');
require('dotenv').config();

module.exports = async (req, res) => {
  console.log('checkAPI')
  try {
    const decoded = await isAuthorized(req);

    const userInfo = await user.findOne({
      where: {
        id: decoded.id,
      },
    });

    if(!userInfo) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    // console.log(decoded);
    if (decoded === null) {
      // 3. 그냥 다 이상이 있을 때,
      res.clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
      });
      res.clearCookie('refreshToken', {
        secure: true,
        sameSite: 'none',
      });
      res.status(400).json({ message: 'Bad Request' });
    } else if (decoded.accessToken) {
      // 2. 이상이 있는데 refresh 해서 보내줬을 때,      

      sendAccessToken(res, decoded.accessToken);
      sendRefreshToken(res, decoded.refreshToken);

      delete decoded.accessToken;
      delete decoded.refreshToken;

      res.status(200).json({
        data: { user_image: decoded.image, username: decoded.username },
        message: 'ok',
      });
    } else {
      // 1. 애초에 이상이 없을 때,
      const result = await user.findOne({
        where: {
          id: decoded.id,
        },
      })
      .then((result) => {
        // console.log(result);
        res.status(200).json({ message: 'ok' });
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json({ message: 'Bad Request' });
      })
      // if (!result) {
      //   res.status(400).json({ message: 'Bad Request' });
      // } else {
      //   res.status(200).json({ message: 'ok' });
      // }
    }
  } catch (err) {
    console.error;
    res.status(500).json({ message: 'server error' });
  }
};
