const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isAuthorized } = require('../tokenFunctions/index.js');
const { dog } = require('../../models');

const util = {
  success: (status, message, data) => {
    return {
      status: status,
      success: true,
      message: message,
      data: data,
    };
  },
  fail: (status, message) => {
    return {
      status: status,
      success: false,
      message: message,
    };
  },
};

require('dotenv').config();

module.exports = async (req, res) => {
  // console.log(req.cookies);
  try {
    const userInfo = await isAuthorized(req)
      .then(result => {
        console.log('userInfo: ', result);
        if (result.accessToken) {
          return res
            .status(401)
            .json({ message: 'you should renew your access token' });
        } 
        return result;
      })
      .catch(err => {
        console.log(err);
        return res.status(401).json({ message: 'unauthorized' });
      });

    // if (userInfo.accessToken) {
    //   return res.status(401).json({ message: 'you should renew your access token' });
    // }

    // if (!userInfo) {
    //   return res.status(401).json({ message: 'unauthorized' });
    // }

    const image = req.file;
    console.log('image: ', image);
    const imageLocation = image.location;
    const imagePath = imageLocation.split('/')[4];
    console.log('imagePath: ', imagePath);
    if (imagePath === undefined) {
      return res
        .status(400)
        .json(util.fail(400, '이미지가 존재하지 않습니다.'));
    }
    console.log('imagePath2: ');
    const updatedDog = await dog
      .update(
        {
          image: imageLocation,
        },
        {
          where: {
            user_id: userInfo.id,
          },
        },
      )
      // .then(result => {
      //   console.log('result: ', result);
      //   return res
      //     .status(200)
      //     .json(util.success(200, '요청 성공', imageLocation));
      // })
      // .catch(err => {
      //   console.log('err: ', err);
      //   return res.status(400).json({ message: 'update failed' });
      // });
      console.log('updatedDog: ', updatedDog);
      if (!updatedDog) {
        console.log('update failed');
        return res.status(400).json({ message: 'update failed' });
      } else {
        console.log('updated succeeded');
        return res.status(200).json({ message: 'success', data: {image: imageLocation }})
      }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' });
  }
};