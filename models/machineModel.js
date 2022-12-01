const mydb = require("./db.js");
const { createPromise } = require('./createPromise.js');

module.exports = {
    
    getAllReservationByUserId: (dormitory, result) => {
        const query1 = "SELECT dormitory FROM member WHERE userId = ?";

        const query2 = "SELECT DISTINCT dormitory, machineNum FROM " +
            "(SELECT dormitory, machineNum, start, end " +
            "FROM machine LEFT JOIN reservation ON machine.dormitory = ? AND reservation.machine_idMachine = machine.idMachine WHERE dormitory = ?) AS m " +
            "WHERE now() BETWEEN start AND end";

        mydb.query(query1, dormitory, (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            var dormitory = res[0].dormitory;
            mydb.query(query2, [dormitory, dormitory], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                var dataList = new Array();
                ['W1', 'W2', 'W3', 'W4', 'D1', 'D2'].forEach(m => {
                    var data = new Object();
                    data.machineNum = m;
                    data.state = 1;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].machineNum === m) {
                            data.state = 0;
                            break;
                        }
                    }
                    dataList.push(data);
                })
    
                result(null, dataList);
            });
        })     
    },

    searchIdMachine: function (dormitory, machineNum) {

        return createPromise("SELECT idMachine FROM machine WHERE (dormitory = '" + dormitory + "' && machineNum = '" + machineNum + "')");

    },

    //기기 예약 확인
    searchMachineReservation: function (idMachine) {

        return createPromise("SELECT start, end FROM reservation WHERE machine_idMachine = '" + idMachine + "'");

    }
}
