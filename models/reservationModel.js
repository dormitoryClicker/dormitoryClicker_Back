const { createPromise } = require('./createPromise.js');

module.exports = {

    //예약 정보 삽입
    insertReservation: function (startDatetime, endDatetime, userId, idMachine) {

        return createPromise(`INSERT INTO reservation (start, end, member_userId, machine_idMachine) VALUES ('${startDatetime}', '${endDatetime}', '${userId}', '${idMachine}')`);

    }
}