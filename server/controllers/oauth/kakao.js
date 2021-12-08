const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');
const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  
  const makeFormData = params => {
    const searchParams = new URLSearchParams()
    Object.keys(params).forEach(key => {
      searchParams.append(key, params[key])
    })
    
    return searchParams
  }
  
  const authCode = req.body.authorizationCode;

  if (authCode) {  
    const tokenResponse = await axios
      .post('https://kauth.kakao.com/oauth/token', makeFormData({
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
    });

    const token = tokenResponse.data.access_token
    const meResponse = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
      
    const id = meResponse.data.id
    const { email, profile } = meResponse.data.kakao_account
    const username = profile.nickname
    const image = profile.profile_image_url
    
    console.log('id : ', id, '\nemail : ', email, '\nusername : ', username, '\nimg : ', image)

    const userInfo = await user.findOne({ where: { kakao_id : id } })
    
    let accessToken

    if(!userInfo) {
      // user create
      const createUser = await user.create({
        username: username,
        email: email !== undefined ? email :null,
        kakao_id: id,
        image: image,
      });

      accessToken = generateAccessToken(createUser.dataValues);
    }
    else
      accessToken = generateAccessToken(userInfo.dataValues);
  
    return res
      .cookie('jwt', accessToken, {
        secure: true,
        sameSite: 'none',
        expiresIn: '1d',
      })
      .status(200)
      .json({
        data: { accessToken, user_image: image, username },
        message: 'successfully logined',
      });
  }
};