const mysql = require('mysql')
const DBconfig = require('../config/db_config.js')

const mydb = mysql.createConnection({
    host: DBconfig.HOST,
    user: DBconfig.USER,
    password: DBconfig.PASSWORD,
    database: DBconfig.DATABASE,
    dateStrings: 'date'
})

mydb.query("SELECT 1", () => {
    console.log("DB connection success");
});

module.exports = mydb;
