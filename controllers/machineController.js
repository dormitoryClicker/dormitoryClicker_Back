const Machine = require('../models/machineModel.js')

class MachineController {
    findAllReservation = async (req, res) => {
        console.log("dormitory:", req.params.dormitory);
        const dormitory = req.params.dormitory;
        if(!['푸름1', '푸름2', '푸름3', '푸름4', '오름1', '오름2', '오름3'].includes(dormitory)) {            
            res.status(404).send({
                message: `not found dormitory with ${req.params.dormitory}`
            })
            return
        }

        Machine.getAllReservationByDormitory(dormitory, (err, result) => {
            if(err) {               
                console.log(err);
                res.status(500).send({
                    message: `Server Unavailabled`
                })                
            }
            res.send(result);
        })
    }
}

module.exports = new MachineController;