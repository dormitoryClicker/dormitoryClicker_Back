const { createPromise } = require('./createPromise.js');
const db = require('./db.js');

module.exports = {

    //예약 정보 삽입
    insertReservation: function (startDatetime, endDatetime, userId, idMachine) {

        return createPromise(`INSERT INTO reservation (start, end, member_userId, machine_idMachine) VALUES ('${startDatetime}', '${endDatetime}', '${userId}', '${idMachine}')`);

    },

    delete: (userId, result) => {
        const deleteSQL = 'delete from reservation where member_userId = ?';
        const updateSQL = 'update member set canReservation = 1 where userId = ?';
        db.beginTransaction((err) => {
            if(err) {
                console.log('error: ', err);
                result(err, null)
                return;
            }
            
            db.query(deleteSQL, userId, (err, res) => {
                if(err) {
                    return db.rollback(() => {
                        console.log("error: ", err);
                    })
                } 
                db.query(updateSQL, userId, (err, res) => {
                    if(err) {
                        return db.rollback(() => {
                            console.log("error: ", err);
                        })
                    }
                    db.commit((err) => {
                        if(err) {
                            return db.rollback(() => {
                                console.log("error: ", err);
                            })
                        }
                    });
                    result(null, "success");
                })
            })
        })
    }
}