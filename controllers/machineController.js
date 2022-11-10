const Machine = require('../models/machineModel.js')

class MachineController {
    findAllReservation = async (req, res) => {
        console.log("dormitory:", req.body.dormitory);
        const dormitory = req.body.dormitory;
        if(!['푸름1', '푸름2', '푸름3', '푸름4', '오름1', '오름2', '오름3'].includes(dormitory)) {            
            res.status(404).send({
                message: `not found dormitory with ${req.params.dormitory}`
            })
            return
        }

        let machines = await Machine.getAllReservationByDormitory(dormitory);
        res.send(machines)
    }
}

module.exports = new MachineController;