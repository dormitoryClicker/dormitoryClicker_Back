const User = require("../models/userModel.js");

exports.findInfoByUserId = (req, res) => {
    console.log('userId:', req.body.userId);
    const userId = req.body.userId;
    
    User.findByUserId(userId, (err, result) => {
        if(err) {
            console.log(err);
            if(err.message === 'not-exist') {
                res.status(404).send({
                    message: `Not found userId with ${req.body.userId}`
                })
            }
            else {
                res.status(500).send({
                    message: 'Server Unavailable'
                })
                
            }
        }
        else
            res.send(result);
    })
};

