require('dotenv').config();
// const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
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

// routers

// user
app.post('/login', controllers.user.login);
app.post('/logout', controllers.user.logout);
app.post('/signup', controllers.user.signup);
app.post('/kakao', controllers.oauth.kakao);
app.post('/google', controllers.oauth.google);
// app.post('/signupPermission', controllers.user.signupPermission);

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
