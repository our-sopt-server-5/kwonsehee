var express = require('express');
var router = express.Router();
var app = express();


router.use('/blog', require('./blog.js'));

router.use('/users', require('./users.js'));

module.exports = router;