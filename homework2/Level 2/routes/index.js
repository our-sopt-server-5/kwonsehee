var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api', require('./api'));

router.use('/api/blog',require('./api/blog'));
app.use('/',router);
module.exports = router;
