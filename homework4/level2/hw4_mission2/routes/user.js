var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('crypto');
const path = require('path');

/* 

    ✔️ sign up

    METHOD : POST

    URI : localhost:3000/user/signup

    REQUEST BODY : id, name, password, email

    RESPONSE STATUS : 200 (OK)

    RESPONSE DATA : User ID

*/

// 3단계

router.post('/signup', async (req, res) => {

    const {
        id,
        name,
        password,
        email
    } = req.body;

    // const salt = crypto.randomBytes(8).toString('hex');
    // crypto.pbkdf2(password, 'salt', 100000,64,'sha512',(err,derivedKey) =>{
    //     if (err) throw err;
    //     console.log(derivedKey.toString('hex'));
    //     const hash = derivedKey;
    // });
    // const hash = await crypto.pbkdf2Sync(password, salt, 100000,64,'sha512');
    // const path = path.join(__dirname + '../models/user.js');
    // fs.writeFile(path + '/salt.txt' , salt);
    // fs.writeFile(path + '/hash.txt' , hash);
    // request data 확인 - 없다면 Null Value 반환
    // if(users.filter(user => user.id === id).length > 0){
    //     return res.status(statusCode.BAD_REQUEST)
    //     .send(util.success(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    // }
    if (!id || !name || !password || !email) {

        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
        //사용중인 아이디가 있는지 확인(배열생성해서 한 거)
        if(await User.checkUser(id)){
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
            return;
        }
    const salt = crypto.randomBytes(8).toString('hex');
    const hash = await crypto.pbkdf2Sync(password, salt, 100000,64,'sha512');
    const idx = await User.signup(id,name,password,salt,email);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR,resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId : idx}));
});



/* 

    ✔️ sign in

    METHOD : POST

    URI : localhost:3000/user/signin

    REQUEST BODY : id, password

    RESPONSE STATUS : 200 (OK)

    RESPONSE DATA : User ID

*/

router.post('/signin', async (req, res) => {

    const{
        id,
        password
    } = req.body;

    // request data 확인 - 없다면 NUll value 반환
    if(!id || !password){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }
     // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if(User.checkUser(id)){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    // const user = User.filter(user => user.id == id);

    // if(user.length == 0){
    //     res.status(statusCode.BAD_REQUEST)
    //     .send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_USER));
    //     return;
    // }
    const hash = await crypto.pbkdf2Sync(password, salt, 100000,64,'sha512');
    if(user.hash !== hash){
        return res.status(statusCode.BAD_REQUEST)
        .send((util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW)));
    }
    // 비밀번호 확인 - 없다면 Miss match password 반환
    if(user[0].password !== password){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS,{userId : id}
        )
    );

});



/* 

    ✔️ get profile

    METHOD : GET

    URI : localhost:3000/user/profile/:id

    RESPONSE STATUS : 200 (OK)

    RESPONSE DATA : User Id, name, email

*/

router.get('/profile/:id', async (req, res) => {

    // request params 에서 데이터 가져오기
    const id  = req.params.id;
    
    // // 존재하는 아이디인지 확인 - 없다면 No user 반환 (user는 배열)
    // const user = User.filter(user => user.id === id);
    if (!id) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    if(await User.checkUser(id)){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,{userId : id}
        )
    )
});

module.exports = router;