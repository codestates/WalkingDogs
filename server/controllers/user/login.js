const bcrypt = require('bcrypt');
const { user } = require('../../models');
const {
  generateAccessToken,
  sendAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunctions');
require('dotenv').config();

// 2021.12.1 진행 중
// logout 된 유저 검증 미완
module.exports = async (req, res) => {
  console.log('loginAPI')
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'bad Request' });
    }

    const userInfo = await user.findOne({
      where: { email: email, is_member: true },
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'unauthorized1' });
    } else {
      const dbPass = userInfo.dataValues.password; //암호화 된 Pass (db에서 가져온 값)
      const userValidate = await bcrypt.compareSync(password, dbPass);

      if (!userValidate) {
        // db에서 가져온 암호와 내가 입력한 암호가 동일하지 않다면 (dbPass를 decode 한 값이 내가 입력한 암호와 동일하지 않다면)
        // 인증 실패, 메세지 전달
        return res.status(401).json({ message: 'unauthorized2' });
      } else {
        // db에서 가져온 암호와 내가 입력한 암호가 동일하다면 (dbPass를 decode 한 값이 내가 입력한 암호와 동일하다면)
        // 인증 성공 후, 토큰을 전달
        const copy = Object.assign({}, userInfo);
        delete copy.dataValues.email;
        delete copy.dataValues.password;
        const accessToken = generateAccessToken(copy.dataValues);
        const refreshToken = generateRefreshToken(copy.dataValues);
        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);
        return res.status(200).json({
          data: {
            image: copy.dataValues.image,
            username: copy.dataValues.username,
          },
          message: 'ok',
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error' });
  }
};
