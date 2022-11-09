module.exports = app => {
    const machines = require('../controllers/machineController.js')

    app.get('/api/dormitory/:dormitory', machines.findAllReservation);
}
