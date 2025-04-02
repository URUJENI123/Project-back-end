import express from 'express';
import { createPharmacy } from '../Controllers/pharmacyController.js';

const router = express.Router();

router.post('/', createPharmacy);

export default router;