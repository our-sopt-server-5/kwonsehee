var express = require('express');
var router = express.Router();
var app = express();


router.get('/login', (req,res) => {
    const result = {
        status: 200,
        message: '로그인됨'
    }
    res.status(200).send(result);
});

router.get('/signup', (req,res) => {
    const result = {
        status: 200,
        message: '회원가입됨'
    }
    res.status(200).send(result);
});

module.exports = router;