module.exports = app => {
    const users = require('../controllers/userController.js')

    app.get('/api/userId/:userId', users.findInfoByUserId);
}
