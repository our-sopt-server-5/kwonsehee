const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const DB = require('../config/database');

module.exports = {
    array: async (req, res) => {
        const images = req.files;
        if(images === undefined){
            return res.status(CODE.OK)
                .send(util.fail(CODE.BAD_REQUEST, "이미지를 첨부하세요"));
        }
        const location = images.map(img => img.location);
        res.status(CODE.OK).send(util.success(CODE.OK, images.length + "개의 이미지 저장 성공"));
    }
}
