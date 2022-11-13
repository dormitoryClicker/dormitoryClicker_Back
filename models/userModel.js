const mydb = require("./db.js");

exports.findByUserId = (userId, result) => {
    const query = "SELECT * FROM " + 
    "(SELECT userId, password, userName, dormitory, start, end FROM member LEFT JOIN reservation ON member.userId = reservation.member_userId) " +
    "AS user_info WHERE userId = ?";

    mydb.query(query, userId, (err, res) => {
        if(err) {
            console.log("error:", err);
            result(err, null)
            return;
        }
        if(res.length) {
            const u = new User(res[0], res[0].start, res[0].end)
            result(null, u);
            return;
        }
        result({message: 'not-exist'}, null);
    });

    function User(res, start, end) {
        this.userId = res.userId;
        this.password = res.password;
        this.userName = res.userName;
        this.dormitory = res.dormitory;
        this.reservation_time = res.start?  {start, end} : null;
    };
}
