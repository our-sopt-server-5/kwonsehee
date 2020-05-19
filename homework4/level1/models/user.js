const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            console.log(insertId);
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
//pool을 이용해서 DB연동
    checkUser: async (id) => {
        const query = `SELECT id FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return false;
            } else return true;
        }catch (err){
            throw err;
        }
    },
    signin: async (id, password) => {
        const fields = 'id,password';
        const questions = `?, ?`;
        const values = [id, password];
        const query = `SELECT * FROM ${table} WHERE id = "${id}" , password = "${password}"`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            console.log(insertId);
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signin ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signin ERROR : ', err);
            throw err;
        }
    },
}

module.exports = user;