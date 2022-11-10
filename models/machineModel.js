const mydb = require("./db.js");


class MachineModel {
    
    getAllReservationByDormitory = async (dormitory) => {
        const query = "SELECT DISTINCT dormitory, m_number FROM " +
            "(SELECT dormitory, m_number, start_date, end_date " +
            "FROM machine LEFT JOIN reservation ON machine.dormitory = ? AND reservation.m_id = machine.id WHERE dormitory = ?) AS m " +
            "WHERE now() BETWEEN start_date AND end_date;"

        const result = await mydb.query(query, [dormitory, dormitory])

        let dataList = new Array(); 
        ['W1', 'W2', 'W3', 'W4', 'D1', 'D2'].forEach(m => {
            var data = new Object();
            data.m_number = m;
            data.state = 1;
            for(var i = 0; i < result.length; i++) {
                if(result[i].m_number === m) {
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
