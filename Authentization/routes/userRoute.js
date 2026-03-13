const express = require('express');
const router = express.Router();

const {
    sendOtpForRegistration,
    verifyAndRegister,
    loginUser,
    googleLogin,
    updateUserRole,
    changePassword,
    resetPassword,
    forgotPassword
} = require('../controller/userController');

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const { loginLimiter, otpLimiter } = require('../middleware/rateLimiter');

router.post('/send-otp', otpLimiter, sendOtpForRegistration);

router.post('/verify-and-register', verifyAndRegister);

router.post('/login', loginLimiter, loginUser);
router.post('/google-login', loginLimiter, googleLogin);

router.post('/forgot-password', otpLimiter, forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/change-password', isAuthenticated, changePassword);


router.patch('/update-role', isAuthenticated, isAdmin, updateUserRole);

module.exports = router;