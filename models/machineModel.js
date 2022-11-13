const mydb = require("./db.js");

exports.getAllReservationByDormitory = (dormitory, result) => {
    const query = "SELECT DISTINCT dormitory, machineNum FROM " +
        "(SELECT dormitory, machineNum, start, end " +
        "FROM machine LEFT JOIN reservation ON machine.dormitory = ? AND reservation.machine_idRoom = machine.idMachine WHERE dormitory = ?) AS m " +
        "WHERE now() BETWEEN start AND end"

    mydb.query(query, [dormitory, dormitory], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        var dataList = new Array();
        ['W1', 'W2', 'W3', 'W4', 'D1', 'D2'].forEach(m => {
            var data = new Object();
            data.machineNum = m;
            data.state = 1;
            for(var i = 0; i < res.length; i++) {
                if(res[i].machineNum === m) {
                    data.state = 0;
                    break;
                }
            }
            dataList.push(data);
        })

        result(null, dataList);
    });
}
