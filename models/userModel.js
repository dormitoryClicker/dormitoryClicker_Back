const mydb = require("./db.js");

class UserModel {

    findByUserId = async (userId) => {
        const query = `SELECT * FROM ` + 
            `(SELECT userId, password, userName, dormitory, start, end FROM member LEFT JOIN reservation ON member.idMember = reservation.member_userId) ` +
            `AS user_info WHERE userId = ?`;
        
        try {
            mydb.beginTransaction();
            const result = await mydb.query(query, [userId])
            mydb.commit();

            var data = new Object();

            data.user_id = result[0].userId;
            data.password = result[0].password;
            data.user_name = result[0].userName;
            data.dormitory = result[0].dormitory;

            var reservation_time = new Object();

            if(result[0].start) {
                reservation_time.start_date = result[0].start;
                reservation_time.end_date = result[0].end;
                data.reservation_time = reservation_time;
            }
            else
                data.reservation_time = null;


            return data;
        }
        catch (err) {
            mydb.rollback();
            console.log(err);
        }
    }
}

module.exports = new UserModel;
