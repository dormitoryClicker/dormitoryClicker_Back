const mysql = require('mysql');
const dbConfig = require('../config/db_Config');
const db = require('./db.js')

module.exports = {

    createPromise: async function (sql) {
        //const db = mysql.createConnection(dbConfig);

        return await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
            //db.end();
        })

    }

}