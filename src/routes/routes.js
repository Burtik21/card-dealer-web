const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameController');

router.post('/connect', controller.connect);
router.post('/kick', controller.kick);
router.post('/deal', controller.deal);
router.post('/calibrate', controller.calibrate);
router.get('/status', controller.status);



module.exports = router;
