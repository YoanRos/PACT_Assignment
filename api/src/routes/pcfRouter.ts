import express from 'express';
import {
  submitPCF,
  fetchPCFById,
  fetchAllPCFs,
} from '../controllers/pcfController';

const router = express.Router();

router.post('/footprints', submitPCF);
router.get('/footprints/:id', fetchPCFById);
router.get('/pcfs', fetchAllPCFs);

export default router;
