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
            const result = await pool.queryParamArr(query);
            const user = result[0];
            const salt = user.salt;
            const hash = await crypto.pbkdf2Sync(password, salt, 100000,64,'sha512');
            if(user.hash !== hash){
                return result;
            }else
            {
                return false;
                }
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signin ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signin ERROR : ', err);
            throw err;
        }
    },
    getUserById: async (Id) => { 
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;

        } catch(err){
            throw err;
        }
    }
}

module.exports = user;