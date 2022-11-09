const mydb = require("./db.js");

class UserModel {

    findByUserId = async (userId, result) => {
        const query = "SELECT * FROM " + 
            "(SELECT user_id, password, username, dormitory, start_date, end_date FROM user LEFT JOIN reservation ON user.id = reservation.u_id) " +
            "AS user_info WHERE user_id = ?";
        
        mydb.query(query, userId, (err, res) => {
            if(err) {
                console.log("error:", err);
                result(err, null)
                return;
            }
            if(res.length) {
                const user = new User(res[0], res[0].start_date, res[0].end_date)
                result(null, user);
                return;
            }
            result({message: 'not-exist'}, null);
        });

        class User {
            user_id;
            password;
            user_name;
            dormitory;
            reservation_time;

            constructor(res, start_date, end_date) {
                this.user_id = res.user_id;
                this.password = res.password;
                this.user_name = res.user_name;
                this.dormitory = res.dormitory;
                this.reservation_time = res.start_date ?  {start_date, end_date} : null;
            }
        }
    }
}

module.exports = new UserModel;
