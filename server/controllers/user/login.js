const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');
require('dotenv').config();

// 2021.12.1 진행 중
// logout 된 유저 검증 미완
module.exports = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const userInfo = await user.findOne({
    where: { email, password },
  });

  if (!userInfo) {
    return res.status(404).json({ message: 'Not Found' });
  } else {
    const copy = Object.assign({}, userInfo);
    delete copy.dataValues.email;
    delete copy.dataValues.password;
    const token = generateAccessToken(copy.dataValues);
    return res
      .status(200)
      .json({
        data: { accessToken: token, user_image: './test.img' },
        message: 'ok',
      });
  }
};
