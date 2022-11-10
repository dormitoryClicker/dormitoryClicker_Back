module.exports = app => {
    const machines = require('../controllers/machineController.js')

    app.post('/api/dormitory', machines.findAllReservation);
}
