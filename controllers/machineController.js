const Machine = require('../models/machineModel.js')

module.exports = {
    findAllReservation: (req, res) => {
        console.log("dormitory: ", req.body.dormitory);
        const dormitory = req.body.dormitory;
        if(!['푸름1', '푸름2', '푸름3', '푸름4', '오름1', '오름2', '오름3'].includes(dormitory)) {            
            res.status(404).send({
                message: `not found dormitory with ${req.body.dormitory}`
            })
            return
        }
    
        Machine.getAllReservationByDormitory(dormitory, (err, result) => {
            if(err) {
                console.log(err)
                res.status(500).send({
                    message: 'Server Unavailable'
                })
            }
            else
                res.send(result);
        })
    },


}

// exports.findNowReservation = (req, res) => {
//     console.log("dormitory: ", req.body.dormitory);
//     const dormitory = req.body.dormitory;
//     if(!['푸름1', '푸름2', '푸름3', '푸름4', '오름1', '오름2', '오름3'].includes(dormitory)) {            
//         res.status(404).send({
//             message: `not found dormitory with ${req.body.dormitory}`
//         })
//         return
//     }

//     Machine.getAllReservationByDormitory(dormitory, (err, result) => {
//         if(err) {
//             console.log(err)
//             res.status(500).send({
//                 message: 'Server Unavailable'
//             })
//         }
//         else
//             res.send(result);
//     })
// }