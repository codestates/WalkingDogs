require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const multer  = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const options = require('./config').options;
const app = express();
const port = 80;
const httpsPort = 443;
const httpsServer = https.createServer(options, app);
const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://walkingdogs.link'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    const to = `https://${req.hostname}${req.url}`;
    res.redirect(to);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//-------------------------------------------
// 이미지 업로드 관련 코드
//-------------------------------------------

// try {
//   fs.readdirSync('uploads');
// } catch(error) {
//   console.log("uploads 폴더가 없어서 uploads 폴더를 생성합니다.");
//   fs.mkdirSync('uploads');
// }

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
  
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'walkingdogs',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { filesize: 5 * 1024 * 1024 },
});

//-----------------------------------------------
// routers
//-----------------------------------------------

// user
app.get('/check', controllers.user.check);
app.post('/login', controllers.user.login);
app.post('/logout', controllers.user.logout);
app.post('/signup', controllers.user.signup);
app.post('/image', upload.single('image'), controllers.user.image);
app.delete('/withdrawal', controllers.user.withdrawal);

// oauth
app.post('/kakao', controllers.oauth.kakao);
app.post('/google', controllers.oauth.google);

// room
app.get('/room/:room_id', controllers.room.roomInfo);
app.post('/new-room', controllers.room.newRoom);
app.put('/room/:room_id/join', controllers.room.joinRoom);
app.post('/reqPermission', controllers.room.reqPermission);
app.get('/request', controllers.room.request);

// mypage
app.get('/dog-list', controllers.mypage.dogList);
app.get('/myroom', controllers.mypage.myroom);
app.patch('/profile', controllers.mypage.profile);
app.post('/password', controllers.mypage.password);

// map
app.get('/location', controllers.map.location);

// comment
app.get('/comment', controllers.comment.allComment);
app.post('/comment', controllers.comment.newComment);
app.put('/comment', controllers.comment.editComment);
app.delete('/comment', controllers.comment.deleteComment);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

httpsServer.listen(httpsPort, () => {
  console.log(`Example app listening at https://localhost:${httpsPort}`);
});

module.exports = httpsServer;
