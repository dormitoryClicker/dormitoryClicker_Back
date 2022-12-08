const mysql = require('mysql')

const mydb = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dateStrings: 'date'
})

mydb.query("SELECT 1", () => {
    console.log("DB connection success");
});

module.exports = mydb;
