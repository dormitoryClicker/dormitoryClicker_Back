let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');
let reservationController = require('../controllers/reservationController');
let machineController = require('../controllers/machineController');

/* --- user --- */
router.post('/signin', userController.doSignIn);
router.post('/signup', userController.doSignUp);
router.post('/user', userController.findInfoByUserId);
router.post('/changeDormitory', userController.changeDormitory);

/* --- reservation --- */
router.post('/reservation', reservationController.doRegister);
router.get('/reservation', reservationController.doView);
router.post('/cancel', reservationController.cancelReservation);

/* --- machine --- */
router.post('/dormitory', machineController.findAllReservation);

module.exports = router;