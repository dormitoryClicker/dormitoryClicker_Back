const mydb = require('../models/db.js');
const Machine = require('../models/machineModel.js')
const User = require('../models/userModel.js')
const Reservation = require('../models/reservationModel.js')

module.exports = {
    findAllReservation: (req, res) => {
        console.log("userId: ", req.body.userId);
        const userId = req.body.userId;

        User.findOne(userId)
        .then(async (userInfo) => {
            const end = await Reservation.findEnd(userId);
            const endTime = end.length ? end[0].end : null;

            Machine.getAllReservationByUserId(userId, (err, result) => {
                if(err) {
                    console.log(err)
                    res.status(500).send(
                        'Server Unavailable'
                    )
                }
                else {
                    var obj = {
                        "userId": userInfo[0].userId,
                        "dormitory": userInfo[0].dormitory,
                        "canReservation": userInfo[0].canReservation,
                        "endDatetime": endTime,
                        "machineStatus": result
                    }
                    // console.log("result: ", result);
                    res.send(obj);

                }
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
    },
}