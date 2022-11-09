const User = require("../models/userModel.js");

class UserController {
    findInfoByUserId = (req, res) => {
        console.log('userId:', req.params.userId);
        const userId = req.params.userId;
    
        User.findByUserId(userId, (err, result) => {
            if(err) {
                console.log(err);
                if(err.message === 'not-exist') {
                    res.status(404).send({
                        message: `Not found userId with ${req.params.userId}`
                    })
                }
                else {
                    res.status(500).send({
                        message: 'Server Unavailabled'
                    })
                }
            }
            res.send(result);
        })
    }
}

module.exports = new UserController;