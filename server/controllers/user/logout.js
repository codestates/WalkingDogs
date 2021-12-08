const { logout } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
require('dotenv').config();

// 2021.12.1 완료
module.exports = async (req, res) => {
  const token = req.cookies['accessToken'];
  const decoded = await isAuthorized(req);
  if(decoded.accessToken) {
    res.status(400).json({ message: 'you should renew your access token' });
  }
  

  if (!decoded) {
    return res.status(401).json({ message: 'authorization failed' });
  } else {
    const isLogout = await logout.findOne({
      where: { token: token },
    });

    if (!isLogout) {
      //로그아웃에 없을 때, 저장
      await logout.create({ token: token });

      return res.status(200).json({ message: 'ok' });
    } else {
      return res
        .status(400)
        .json({ message: 'bad request! you already logouted!' });
    }
  }
};
