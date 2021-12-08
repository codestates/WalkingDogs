const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { user, dog } = require('../../models');

const util = {
    success: (status, message, data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },
    fail: (status, message) => {
        return {
            status: status,
            success: false,
            message: message
        }
    }
}

require('dotenv').config();

module.exports = async (req, res) => {
  const image = req.file;
  console.log(req.file);
  if(image === undefined) {
      return res.status(400).json(util.fail(400, '이미지가 존재하지 않습니다.'));
  }
  res.status(200).json(util.success(200, '요청 성공', image));
};
