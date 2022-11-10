const mydb = require("./db.js");

class UserModel {

    findByUserId = async (userId) => {
        const query = `SELECT * FROM ` + 
            `(SELECT user_id, password, username, dormitory, start_date, end_date FROM user LEFT JOIN reservation ON user.id = reservation.u_id) ` +
            `AS user_info WHERE user_id = ?`;
        
        try {
            mydb.beginTransaction();
            const result = await mydb.query(query, [userId])
            mydb.commit();

            var data = new Object();
            var reservation_time = new Object();

            reservation_time.start_date = result[0].start_date;
            reservation_time.end_date = result[0].end_date;

            data.user_id = result[0].user_id;
            data.password = result[0].password;
            data.user_name = result[0].username;
            data.dormitory = result[0].dormitory;
            data.reservation_time = reservation_time;

            return data;
        }
        catch (err) {
            mydb.rollback();
            console.log(err);
        }
    }
}

module.exports = new UserModel;
