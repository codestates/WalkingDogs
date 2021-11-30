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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['https://localhost:3000'],
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

// router

// const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

// let httpsServer;
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   httpsServer = https.createServer(credentials, app);
//   httpsServer.listen(HTTPS_PORT, () => console.log('server runnning'));
// } else {
//   httpsServer = app.listen(HTTPS_PORT);
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

httpsServer.listen(httpsPort, () => {
  console.log(`Example app listening at https://localhost:${httpsPort}`);
});

module.exports = httpsServer;
