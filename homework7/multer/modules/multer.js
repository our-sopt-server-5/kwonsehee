const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

//키 값 불러오는거야
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'soptsopt2626',
        acl: 'public-read',
        key: function(req, file, cb){
            cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        }
    })
});
module.exports = upload;