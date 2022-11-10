module.exports = app => {
    const users = require('../controllers/userController.js')

    app.post('/api/userId', users.findInfoByUserId);
}
