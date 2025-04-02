import express from 'express';
import { updateMedicine, createStock } from '../Controllers/medicineController.js';

const router = express.Router();

router.post('/', updateMedicine);
router.post('/', createStock)

export default router;