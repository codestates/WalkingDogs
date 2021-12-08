const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
// require("dotenv").config();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URL;
// const axios = require("axios");

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
);

// const scopes = [
//   "https://www.googleapis.com/auth/userinfo.email",
//   "https://www.googleapis.com/auth/userinfo.profile",
// ];

// const url = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: scopes,
// });

const { OAuth2Client } = require('google-auth-library');

module.exports = async (req, res) => {
  const authorizationCode = req.body.authorizationCode;

  //   console.log('authorizationCode:', authorizationCode);
  const { tokens } = await oauth2Client.getToken(authorizationCode);
  oauth2Client.setCredentials(tokens);
  //   console.log('tokens: ', tokens);


  let email = '';
  let username = '';
  let image = '';

  const client = new OAuth2Client(clientId);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // console.log('payload: ', payload);

    email = payload.email;
    username = payload.name;
    image = payload.picture;
    const currentUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if (currentUser) {

      delete currentUser.dataValues.email;
      delete currentUser.dataValues.password;
     

      const newAccessToken = generateAccessToken(currentUser.dataValues);
      
      return res
        .cookie('jwt', newAccessToken, {
          secure: true,
          sameSite: 'none',
          expiresIn: '1d',
        })
        .status(200)
        .json({ data: { accessToken: newAccessToken, username: currentUser.dataValues.username, user_image: currentUser.dataValues.image }, message: 'ok' });
    }
    else {

      const userInfo = await user.create({
        username: username,
        email: email,
        image: image,
      });

      
      delete userInfo.dataValues.email;
      delete userInfo.dataValues.password;

      const newAccessToken = generateAccessToken(userInfo.dataValues);
      return res
        .cookie('jwt', newAccessToken, {
          secure: true,
          sameSite: 'none',
          expiresIn: '1d',
        })
        .status(200)
        .json({ data: { accessToken: newAccessToken, username: userInfo.dataValues.username, user_image: userInfo.dataValues.image }, message: 'ok' });

    }
  }

  verify().catch(console.error);
};
