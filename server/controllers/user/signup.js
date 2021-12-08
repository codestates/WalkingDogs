const bcrypt = require('bcrypt');
const { user } = require('../../models');
require('dotenv').config();

// 2021.12.1 완료
module.exports = async (req, res) => {
  const { email, password, username, image } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'bad request' });
  } else {
    const conflictUser = await user.findOne({
      where: { email: email },
    });
    if (conflictUser) {
      return res.status(409).json({ message: 'conflict' });
    } else {
      const hashedPass = await bcrypt.hashSync(password, 10);

      console.log(hashedPass);

      await user.create({
        email: email,
        password: hashedPass,
        username: username,
        image: image ? image : null,
      });

      return res.status(201).json({ message: 'ok' });
    }
  }
};

// signupPermission
// const { user } = require('../../models');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // 2021.12.1 완료
// module.exports = async (req, res) => {
//   const { email, password, username, image } = req.body;

//   if (!email || !password || !username) {
//     return res.status(400).json({ message: 'bad request' });
//   } else {
//     const conflictUser = await user.findOne({
//       where: { email: email },
//     });
//     if (conflictUser) {
//       return res.status(409).json({ message: 'conflict' });
//     } else {
//       const randomCode = function (min, max) {
//         var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
//         return ranNum;
//       };

//       const number = randomCode(111111, 999999);

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.NODEMAILER_USER,
//           pass: process.env.NODEMAILER_PASS,
//         },
//       });

//       const message = {
//         from: 'WalkingDogs',
//         to: `${email}`,
//         subject: 'WalkingDogs 회원가입을 위한 인증번호를 입력해주세요.',
//         text: '숫자 6자리를 입력해주세요 : ' + number.toString(),
//       };

//       await transporter.sendMail(message, (err, response) => {
//         if (err) {
//           res.json({ message: 'error' });
//         } else {
//           res.status(200).json({ randomCode: number, success: true });
//         }
//         transporter.close();
//       });
//     }
//   }
// };
