const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'walkingdogs',
    // acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `original/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { filesize: 5 * 1024 * 1024 }
});
module.exports = upload;



// const upload = multer({
//     storage: multerS3({
//       s3: new AWS.S3(),
//       bucket: 'walkingdogs',
//       key(req, file, cb) {
//         cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
//       },
//     }),
//     limits: { filesize: 5 * 1024 * 1024 },
//   });
  