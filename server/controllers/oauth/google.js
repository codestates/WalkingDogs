const { user } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../tokenFunctions');
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
  console.log('googleAPI')
  try {
    const authorizationCode = req.body.authorizationCode;

    //   console.log('authorizationCode:', authorizationCode);
    const { tokens } = await oauth2Client.getToken(authorizationCode);
    if (!tokens) {
      return res.status(401).json({ message: 'unauthorized' });
    }

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
      if (!ticket) {
        return res.status(400).json({ message: 'bad request' });
      }
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
        const newRefreshToken = generateRefreshToken(currentUser.dataValues);

        res.cookie('accessToken', newAccessToken, {
          secure: true,
          sameSite: 'none',
          expiresIn: '1h',
        });
        res.cookie('refreshToken', newRefreshToken, {
          secure: true,
          sameSite: 'none',
          expiresIn: '7d',
        });
        return res.status(200).json({
          data: {
            username: currentUser.dataValues.username,
            image: currentUser.dataValues.image,
          },
          message: 'ok',
        });
      }
      else {
        const userInfo = await user.create({
          username: username,
          email: email,
          image: image,
          is_member: true,
        })
        .catch(err => {
          console.log(err)
          return res.status(500).json({ message: 'Server Error' });
        });

        delete userInfo.dataValues.email;
        delete userInfo.dataValues.password;

        const newAccessToken = generateAccessToken(userInfo.dataValues);
        const newRefreshToken = generateRefreshToken(userInfo.dataValues);

        res.cookie('accessToken', newAccessToken, {
          secure: true,
          sameSite: 'none',
          expiresIn: '1h',
        });
        res.cookie('refreshToken', newRefreshToken, {
          secure: true,
          sameSite: 'none',
          expiresIn: '7d',
        });

        return res.status(200).json({
          data: {
            username: userInfo.dataValues.username,
            image: userInfo.dataValues.image,
          },
          message: 'ok',
        });
      }
    }

    verify();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};
