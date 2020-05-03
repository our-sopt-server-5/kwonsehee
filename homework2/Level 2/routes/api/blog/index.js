var express = require('express');
var router = express.Router();

router.get('/post', (req,res) => {
    const result = {
        status: 200,
        message: '이게되야한다구'
    }
    res.status(200).send(result);
});
module.exports = router;