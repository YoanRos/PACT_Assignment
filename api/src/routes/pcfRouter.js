const express = require('express');
const router = express.Router();
const pcfController = require('../controllers/pcfController');

router.post('/footprints', pcfController.submitPCF);
router.get('/footprints/:id', pcfController.getPCFById);
router.get('/pcfs', pcfController.getAllPCFs);

module.exports = router;
