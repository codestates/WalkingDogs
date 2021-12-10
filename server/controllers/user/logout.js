const { logout } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
require('dotenv').config();

// 2021.12.1 완료
module.exports = async (req, res) => {
  try {
    // const token = req.cookies['accessToken'];
    const decoded = await isAuthorized(req);
    // if(decoded.accessToken) {
    //   return res.status(401).json({ message: 'you should renew your access token' });
    // }

    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ message: 'unauthorized' });
    } else {
      res.clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
      });
      res.clearCookie('refreshToken', {
        secure: true,
        sameSite: 'none',
      });
      res.status(200).json({ message: 'ok' });

      // const isLogout = await logout.findOne({
      //   where: { token: token },
      // });
      // if (!isLogout) {
      //   //로그아웃에 없을 때, 저장
      //   await logout.create({ token: token });

      //   return res.status(200).json({ message: 'ok' });
      // } else {
      //   return res
      //     .status(400)
      //     .json({ message: 'bad request! you already logouted!' });
      //   // return res.status(200).json({ message: 'ok' });

      // }
    }
  } catch (err) {
    console.error;
    res.status(500).json({ message: 'server error' });
  }
};
