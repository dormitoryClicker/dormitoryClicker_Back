let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');
let reservationController = require('../controllers/reservationController');
let machineController = require('../controllers/machineController');

router.post('/signin', userController.doSignIn);
router.post('/signup', userController.doSignUp);
router.post('/reservation', reservationController.doRegister);
router.get('/reservation', reservationController.doView);
router.post('/user', userController.findInfoByUserId);
router.post('/dormitory', machineController.findAllReservation);

module.exports = router;