const mysql = require('promise-mysql');

const dbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '0817ksh0817&',
    database: 'sopt',
    dateString: 'date'
}

module.exports = mysql.createPool(dbConfig);
