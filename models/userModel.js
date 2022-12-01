const mydb = require("./db.js");

const { createPromise } = require('./createPromise.js');

module.exports = {

    //로그인
    signIn: function (userId, password) {

        return createPromise("SELECT * FROM member WHERE (userId = '" + userId + "' && password = '" + password + "')");

    },

    //회원가입
    signUp: async function (userId, password, userName, dormitory) {

        return createPromise(`INSERT INTO member (userId, password, userName, dormitory, canReservation) VALUES ('${userId}', '${password}', '${userName}', '${dormitory}', ${true})`);

    },

    //아이디 중복 확인
    existId: function (userId) {

        return createPromise("SELECT * FROM member WHERE (userId = '" + userId + "')");

    },

    //예약 가능 확인
    searchCanReservation: function (userId) {

        return createPromise("SELECT canReservation FROM member WHERE userId = '" + userId + "'");

    },

    //예약 불가능으로 수정
    updateCanReservation: function (userId) {

        return createPromise("Update member SET canReservation = 0 WHERE userId = '" + userId + "'");

    },

    updateCanReservation_1: function (userId) {
        
        return createPromise("Update member SET canReservation = 1 WHERE userId = '" + userId + "'");

    },

    //현재 시간을 지난 예약자들
    overtimeUser: function () {

        return createPromise("SELECT userId from member left join reservation on reservation.member_userId = member.userId where (timediff(reservation.end, now()+9) < 1)");

    },

    findOne: (userId) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT userId, dormitory, canReservation FROM member WHERE userId = ?";
            
            mydb.query(query, userId, (err, res) => {
                if (err) {
                    console.log("error:", err);
                    reject(err);
                    return;
                }
                if(res.length) {
                    resolve(res);
                    return;
                }
                reject({message: 'not-exist'});
            })
        })
    },

    updateDormitoryByUserId: (userId, dormitory, result) => {
        const query_update = "UPDATE member SET dormitory = ?, canReservation = 1 WHERE userId = ?";
        const query_delete = "DELETE FROM reservation WHERE member_userId = ?";
        mydb.getConnection((err, conn) => {
            if(err) {
                console.log(err)
                result({message: 'db-error'}, null);
                return;
            }
            conn.beginTransaction(err => {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                conn.query(query_update, [dormitory, userId], (err, res) => {
                    if(err) {
                        return conn.rollback(() => {
                            console.log("error: ", err);
                        })
                    }
                    conn.query(query_delete, userId, (err, ress) => {
                        if(err) {
                            return conn.rollback(() => {
                                console.log("error: ", err);
                            })
                        }
                        conn.commit((err) => {
                            if(err) {
                                return conn.rollback(() => {
                                    console.log("error: ", err);
                                })
                            }
                        });
                        result(null, "success");
                    })
                })
            })
        })
    },
    
    findByUserId: (userId, result) => {
        const query = "SELECT * FROM " +
            "(SELECT userId, password, userName, dormitory, start, end FROM member LEFT JOIN reservation ON member.userId = reservation.member_userId) " +
            "AS user_info WHERE userId = ?";

        mydb.query(query, userId, (err, res) => {
            if (err) {
                console.log("error:", err);
                result(err, null)
                return;
            }
            if (res.length) {
                const u = new User(res[0], res[0].start, res[0].end)
                result(null, u);
                return;
            }
            result({ message: 'not-exist' }, null);
        });

        function User(res, start, end) {
            this.userId = res.userId;
            this.password = res.password;
            this.userName = res.userName;
            this.dormitory = res.dormitory;
            this.reservation_time = res.start ? { start, end } : null;
        };
    }
}
