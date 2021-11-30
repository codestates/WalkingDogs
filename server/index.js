const express = require('express');
const https = require('https');
const app = express();
const options = require('./config').options;
const port = 80;
const httpsPort = 443;

app.use((req, res, next) => {
  if(req.secure) {
    next();
  }else {
    const to = `https://${req.hostname}${req.url}`;
    res.redirect(to);
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Example app listening at https://localhost:${httpsPort}`)
});
