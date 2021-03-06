const { user } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../tokenFunctions');
const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  console.log('kakaoAPI')
  try {
    const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

    const makeFormData = params => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        searchParams.append(key, params[key]);
      });
      // console.log(searchParams);
      return searchParams;
    };

    const authCode = req.body.authorizationCode;
    if (authCode) {
      const tokenResponse = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        makeFormData({
          grant_type: 'authorization_code',
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: authCode,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          withCredentials: true,
        },
      );
      if (!tokenResponse) {
        res.status(400).json({ message: 'token not found' });
      }

      const token = tokenResponse.data.access_token;
      const meResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (!meResponse) {
        res.status(400).json({ message: 'userInfo not found' });
      }

      const id = meResponse.data.id;
      const { email, profile } = meResponse.data.kakao_account;
      const username = profile.nickname;
      const image = profile.profile_image_url;

      const userInfo = await user.findOne({ where: { kakao_id: id } });

      let accessToken;
      let refreshToken;

      if (!userInfo) {
        // user create
        const createUser = await user.create({
          username: username,
          email: email !== undefined ? email : 'null',
          kakao_id: id,
          image: image,
          is_member: true,
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({ message: 'Server Error' });
        });

        accessToken = generateAccessToken(createUser.dataValues);
        refreshToken = generateRefreshToken(createUser.dataValues);
      } else {
        accessToken = generateAccessToken(userInfo.dataValues);
        refreshToken = generateRefreshToken(userInfo.dataValues);
      }

      res.cookie('accessToken', accessToken, {
        secure: true,
        sameSite: 'none',
        expiresIn: '1h',
      });
      res.cookie('refreshToken', refreshToken, {
        secure: true,
        sameSite: 'none',
        expiresIn: '7d',
      });
      return res.status(200).json({
        data: { image, username },
        message: 'successfully logined',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error' });
  }
};
