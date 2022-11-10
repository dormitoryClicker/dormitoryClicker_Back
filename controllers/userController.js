const User = require("../models/userModel.js");

class UserController {
    findInfoByUserId = async (req, res) => {
        console.log('userId:', req.body.userId);
        const userId = req.body.userId;
        
        let userInfo = await User.findByUserId(userId);
        console.log(userInfo)
        res.send(userInfo)
    }
}

module.exports = new UserController;