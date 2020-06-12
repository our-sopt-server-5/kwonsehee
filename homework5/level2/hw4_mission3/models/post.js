const pool = require('../modules/pool');
const database = require('../config/database');
let moment = require('moment');
const table = 'post';

const post = {
    read: async(idx)=>{
        const query = `select * from ${table} WHERE postIdx = ${idx}`;
        try{
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return false;
            }
            else{
                return true;
            }
        }catch(err){
            console.log('err:', err);
        }
    },
    readAll : async() => {
            const query = `select * from ${table}`;
            try{
                const result = await pool.queryParam(query);
                return result;
            }catch(err){
                console.log('err:', err);
                throw err;
            }
    },
    create: async(author, title, content) => {
        const createAt = moment().format("YYYY-MM-DD");
        const fields = 'author, title, content, createdAt';
        const questions = `?, ? , ? ,?`;
        const values = [author, title, content, createdAt];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        }catch(err){
            console.log('err:', err);
        }
    },
    delete: async(idx)=>{
        const query = `DELETE FROM ${table} WHERE postIdx = "${idx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('err:', err);
        }
    },
    update : async(idx, title, content) =>{
        const query = `UPDATE ${table} SET title="${title}",content="${content}" WHERE idx = "${idx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('err:', err);
        }
}
}
module.exports = post;