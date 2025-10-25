const express = require('express');
const router = express.Router();
const {
  register,
  verifyOTP,
  login,
  getMe,
  resendOTP,
  logout
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

// Public routes
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/resend-otp', resendOTP);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;