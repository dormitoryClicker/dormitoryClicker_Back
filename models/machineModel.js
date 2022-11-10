const mydb = require("./db.js");


class MachineModel {
    
    getAllReservationByDormitory = async (dormitory) => {
        const query = "SELECT DISTINCT dormitory, machineNum FROM " +
            "(SELECT dormitory, machineNum, start, end " +
            "FROM machine LEFT JOIN reservation ON machine.dormitory = ? AND reservation.machine_idMachine = machine.idMachine WHERE dormitory = ?) AS m " +
            "WHERE now() BETWEEN start AND end;"

        const result = await mydb.query(query, [dormitory, dormitory])

        let dataList = new Array(); 
        ['W1', 'W2', 'W3', 'W4', 'D1', 'D2'].forEach(m => {
            var data = new Object();
            data.m_number = m;
            data.state = 1;
            for(var i = 0; i < result.length; i++) {
                if(result[i].machineNum === m) {
                    data.state = 0;
                    break;
                }
            }
            dataList.push(data);
        })
        return dataList;
    }
}

module.exports = new MachineModel;
