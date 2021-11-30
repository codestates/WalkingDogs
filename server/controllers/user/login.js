const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');
require('dotenv').config();

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
    delete copy.password;
    const token = generateAccessToken(copy);
    return res.status(200).json({ data: token, message: 'ok' });
  }
};
