import express from "express";
import { getUserProfile } from '../Controllers/userController.js';

const router = express.Router();

router.post('/', getUserProfile);

export default router;