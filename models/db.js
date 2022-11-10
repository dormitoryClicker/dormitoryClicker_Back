const mysql = require('mysql')
const DBconfig = require('../config/db_config.js')

class DB {

    constructor() {
        this.db = mysql.createConnection({
            host:DBconfig.HOST,
            user: DBconfig.USER,
            password: DBconfig.PASSWORD,
            database: DBconfig.DATABASE
        });
        this.db.connect(err => {
            if(err) {
                console.log(err);
                throw err;
            }
            console.log("DB connection success");
        })
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (err, result) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
            this.db.query(sql, values, callback);
        }).catch(err => {
            console.log(err);
        })
    }

    beginTransaction = () => {
        this.db.beginTransaction();
    }

    rollback = () => {
        this.db.rollback();
    }

    commit = () => {
        this.db.commit();
    }
}

const mydb = new DB();

module.exports = mydb;
