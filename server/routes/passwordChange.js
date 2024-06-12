import express from 'express';
import { sendOTP, verifyOTP, updatePassword } from '../controllers/passwordChange.js';
const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/update-password', updatePassword);

export default router;
