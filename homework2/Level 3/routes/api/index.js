var express = require('express');
var router = express.Router();
var app = express();
router.get('/', (req,res) => {
    const result = {
        status: 200,
        message: 'api~'
    }
    res.status(200).send(result);
});

router.get('/blog/post', (req,res) => {
    const result = {
        status: 200,
        message: '이게되야한다구'
    }
    res.status(200).send(result);
});


router.route('/users/login').post((req,res) => {
    console.log('로그인 처리함')

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express server에 응답한 결과입니다.</h1>');
    res.write('<div><p>param id :' + paramId + '</p></div>');
    res.write('<div><p>param password : ' + paramPassword + '</p></div>');
    res.end();
});
router.route('/users/signup').post((req,res) => {
    console.log('회원가입 처리함')
    var paramName = req.body.name || req.query.name;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express server에 응답한 결과입니다.</h1>');
    res.write('<div><p>param name :' + paramName + '</p></div>');
    res.write('<div><p>param id :' + paramId + '</p></div>');
    res.write('<div><p>param password : ' + paramPassword + '</p></div>');
    res.end();
});

module.exports = router;