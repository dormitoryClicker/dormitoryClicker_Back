const Machine = require('../models/machineModel.js')
const User = require('../models/userModel.js')

module.exports = {
    
    findAllReservation: (req, res) => {
        console.log("userId: ", req.body.userId);
        const userId = req.body.userId;
        // {
        //     domitory: "푸름1",
        //     canReservation: 1,
        //     machine: [
        //      {W1: 0},
        //      {W2: 0} 
                // .
                // .
                // .    
        //     ]
        // }

        User.findOne(userId)
        .then((userInfo) => {
            //console.log('userInfo', userInfo);
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