var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middlewares/auth');
const ImageController = require('../controllers/image');
const multer = require('multer');
const upload = require('../modules/multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./user'));
router.use('/image', AuthMiddleware.checkToken, upload.array('images', 4), ImageController.array);

module.exports = router;
