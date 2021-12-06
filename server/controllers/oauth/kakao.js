const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');
const bcrypt = require('bcrypt');
const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

  const authCode = req.body.authorizationCode;
  if (authCode) {
    axios
      .post('https://kauth.kakao.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        code: authCode,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        const token = response.data.access_token;
        axios.get(
          'https://kapi.kakao.com/v2/user/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          { withCredentials: true },
        );
      })
      .then(async data => {
        const nickname = data.data.properties.nickname;
        const email = data.data.kakao_account.email;
        const password = '1q2w3e4r!';
        const hashedPassword = bcrypt.hashSync(password, 10);
        const kakaoEmail = await user.findOne({ where: { email } });
        const kakaoNickname = await user.findOne({ where: { nickname } });

        if (kakaoEmail !== null) {
          return res.status(409).json({ message: 'e-mail already exists!' });
        } else if (kakaoNickname !== null) {
          return res.status(409).json({ message: 'nickname already exists!' });
        } else {
          const createUser = await user.create({
            email: email,
            password: hashedPassword,
            nickname: nickname,
          });

          const accessToken = generateAccessToken(createUser.dataValues);
          return res
            .cookie('accessToken', accessToken, {
              secure: true,
              sameSite: 'none',
              expiresIn: '1d',
            })
            .status(200)
            .json({
              data: createUser.dataValues,
              message: 'successfully logined',
            });
        }
      });
  }
};
