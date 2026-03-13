// import rateLimit from "express-rate-limit";
const rateLimit = require('express-rate-limit');


/**
 * LOGIN RATE LIMITER
 * Max 5 attempts in 10 minutes
 */

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 10 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * OTP RATE LIMITER
 * Max 3 OTP requests in 5 minutes
 */

const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5,
    message: {
        success: false,
        message: "OTP limit exceeded. Please try again after 5 minutes."
    }
});

module.exports = { loginLimiter, otpLimiter };