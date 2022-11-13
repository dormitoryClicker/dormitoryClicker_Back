const mysql = require('mysql')
const DBconfig = require('../config/db_config.js')

const mydb = mysql.createConnection({
    host: DBconfig.HOST,
    user: DBconfig.USER,
    password: DBconfig.PASSWORD,
    database: DBconfig.DATABASE,
    dateStrings: 'date'
})

mydb.connect(err => {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log("DB connection success");
})

module.exports = mydb;
