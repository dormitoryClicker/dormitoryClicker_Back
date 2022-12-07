const db = require('./db.js')

module.exports = {
    createPromise: async function (sql) {
        return await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })

    }

}