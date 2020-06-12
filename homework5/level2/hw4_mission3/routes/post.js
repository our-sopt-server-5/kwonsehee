var express = require('express');
var router = express.Router();
let post = require('../models/post');
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
var moment = require('moment');

router.get('/', async(req,res)=> {
    const result = await post.readAll();
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, result));
});

router.get('/:idx', async(req,res)=> {
    const idx = req.params.idx;
    const result = await post.read();
    if(!idx){
        res.status(statusCode.BAD_REQUEST)
        .send(util.success(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, result));
});

router.post('/', async(req,res)=>{
    const {
        author,
        title,
        content
    } = req.body;
    if(!author || !title || !content){
        res.status(statusCode.BAD_REQUEST)
        .send(util.success(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    var time = moment();
    const created_at = time.format('YYYY-MM-DD');
    const ct=  await post.create(author,title,content,created_at);
    if(!ct){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.DB_ERROR, resMessage.CREATE_FAIL));
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, ct));
});

router.put('/:idx', (req,res)=> {
    const idx = req.params.idx;
    const{
        author,
        title,
        content
    } = req.body;
    var time = moment();
    const created_at = time.format('YYYY-MM-DD');

    if(!idx){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }
    const updatePost = {author: author, title: title, content: content};
    const update= post.update(idx,updatePost);
    update.created_at = created_at;
    if(!update){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.UPDATE_FAIL));
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK,resMessage.READ_PROFILE_SUCCESS, update));
});



router.delete('/:idx', async (req,res)=> {
    const idx = req.params.idx;
    //idx를 사용자가 아예 입력하지 않았을 때
    if(!idx){
        res.status(statusCode.BAD_REQUEST)
        .send(util.success(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    //idx가 입력으로 들어오긴했는데 DB에 없는 거일 때
    if(!await post.delete(idx)){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.NO_CONTENT, resMessage.DELETE_SUCCESS));
});

module.exports = router;
