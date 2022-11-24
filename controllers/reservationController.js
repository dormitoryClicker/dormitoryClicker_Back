const reservation = require('../models/reservationModel');
const user = require('../models/userModel');
const machine = require('../models/machineModel');
const db = require('../models/db.js')

module.exports = {

    doRegister: async function (req, res) {

        let userId = req.body.userId;
        let dormitory = req.body.dormitory;
        let machineNum = req.body.machineNum;
        let startDatetime = req.body.startDatetime;
        let endDatetime = req.body.endDatetime;

        if ((userId == undefined) || (dormitory == undefined) || (machineNum == undefined) || (startDatetime == undefined) || (endDatetime == undefined)) {
            res.send("Bad request");
            return;
        }

        try {
            //예약 가능 확인
            let result1 = await user.searchCanReservation(userId);

            if (result1[0].canReservation == false) {
                console.log(result1);
                res.send("already reservation");
                return;
            }
            //기기 id 확인
            let result = await machine.searchIdMachine(dormitory, machineNum);

            if (result.length != 1) {
                res.send("There's no machine");
            }
            else {
                //예약 정보 삽입
                // await reservation.insertReservation(startDatetime, endDatetime, userId, result[0].idMachine)

                //멤버정보 예약 불가능으로 수정
                // await user.updateCanReservation(userId)

                db.beginTransaction(async (err) => {
                    if (err)
                        return

                    await reservation.insertReservation(startDatetime, endDatetime, userId, result[0].idMachine)
                        .catch((err) => {
                            res.send("insert Error")
                            return db.rollback(() => {
                                console.log(err);
                            })
                        });

                    await user.updateCanReservation(userId)
                        .then((result) => {
                            res.send("success");
                        })
                        .catch((err) => {
                            res.send("updateReservation Error")
                            return db.rollback(() => {
                                console.log(err);
                            })
                        });

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.log(err);
                            })
                        }
                    })
                })


                //res.send("success");
            }
        }
        catch (e) {
            res.send(e);
        }
    },

    doView: async function (req, res) {
        let dormitory = req.query.dormitory;
        let machineNum = req.query.machineNum;

        try {
            //기기 id 확인
            let result1 = await machine.searchIdMachine(dormitory, machineNum);
            if (result1.length != 1) {
                res.send("There's no machine");
            }
            else {
                //기기에 대한 예약 검색
                let result2 = await machine.searchMachineReservation(result1[0].idMachine);
                let start = [];
                let end = [];
                result2.map((item, i) => {
                    start[i] = item.start;
                    end[i] = item.end;
                })
                res.send({
                    startDatetime: start,
                    endDatetime: end
                });
            }
        }
        catch (e) {
            res.send(e);
        }
    },

    cancelReservation: (req, res) => {
        console.log('userId: ', req.body.userId);
        const userId = req.body.userId;

        user.findOne(userId)
        .then(userInfo => {
            reservation.delete(userInfo[0].userId, (err, result) => {
                if(err) {
                    console.log('error: ', err);
                }
                res.send(result);
            })
        })
        .catch((err) => {
            console.log(err);
            if(err.message === 'not-exist') {
                res.status(404).send(
                    `Not found userId with ${req.body.userId}`
                )
            }
            else {
                res.status(500).send(
                    'Server Unavailable'
                )
            }
        })

    }

}