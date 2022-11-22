const Machine = require('../models/machineModel.js')
const User = require('../models/userModel.js')

module.exports = {
    findAllReservation: (req, res) => {
        console.log("userId: ", req.body.userId);
        const userId = req.body.userId;

        User.findOne(userId)
        .then(() => {
            Machine.getAllReservationByUserId(userId, (err, result) => {
                if(err) {
                    console.log(err)
                    res.status(500).send(
                        'Server Unavailable'
                    )
                }
                else
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
    },
}