import express from 'express';
import { createDoctorProfile } from '../Controllers/doctorController.js';

const router = express.Router();

router.post('/', createDoctorProfile);

export default router;