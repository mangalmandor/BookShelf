const User = require("../model/userModel");
const Otp = require("../model/otpModel");
const sendOtp = require('../utils/emailSender');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const admin = require("../config/firebaseAdmin");

// --- CONTROLLERS ---

// 1. SEND OTP (Registration se pehle call hoga)
const sendOtpForRegistration = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ successful: false, message: "User already exists" });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to Database (upsert: true matlab agar pehle se hai toh update kare, nahi toh naya banaye)
        await Otp.findOneAndUpdate(
            { email },
            { otp, createdAt: Date.now() },
            { upsert: true, new: true }
        );

        // Email send karo
        await sendOtp(email, otp);

        return res.status(200).json({
            successful: true,
            message: "OTP sent to your email successfully"
        });
    } catch (err) {
        console.error("Send OTP Error:", err);
        res.status(500).json({ successful: false, message: "Error sending OTP" });
    }
};

// 2. VERIFY & REGISTER (Asli User Creation yahin hogi)
const verifyAndRegister = async (req, res) => {
    try {
        const { name, email, password, inputOtp } = req.body;

        // 1. Database se OTP record uthao
        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({
                successful: false,
                message: "OTP expired or not found. Please resend OTP."
            });
        }

        // 2. OTP Check karo
        if (otpRecord.otp !== inputOtp) {
            return res.status(400).json({ successful: false, message: "Invalid OTP" });
        }

        // 3. User ko Hash karke create karo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: true,
            role: 'user'
        });

        // 4. OTP ka kaam khatam, delete kar do
        await Otp.deleteOne({ email });

        return res.status(201).json({
            successful: true,
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });

    } catch (err) {
        console.error("Verify & Register Error:", err);
        res.status(500).json({ successful: false, message: "Internal Server Error" });
    }
};

// 3. LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                successful: false,
                message: "Email and Password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                successful: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                successful: false,
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 86400000,
                sameSite: "lax",
            })
            .status(200)
            .json({
                successful: true,
                message: "Login Successful",
                user: { ...user.toObject(), password: undefined, token: token },
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({ successful: false, message: "Login failed" });
    }
};

// 3.2 //Goole-Login
const googleLogin = async (req, res) => {
    // console.log('chala 1 ');
    try {
        // console.log('chala 2 ');
        const { idToken } = req.body;
        // console.log(idToken);

        if (!idToken) {

            return res.status(400).json({
                successful: false,
                message: "Google token is required",
            });
        }

        // 🔐 Firebase token verify
        // console.log('chala  3 ');
        const decoded = await admin.auth().verifyIdToken(idToken);
        // console.log('chala 4 ');

        const token = jwt.sign(
            {
                email: decoded.email,
                firebaseUid: decoded.uid,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        };

        return res
            .status(200)
            .cookie("token", token, cookieOptions)
            .json({
                successful: true,
                message: "Google Login Successful",
                token,
                user: {
                    email: decoded.email,
                    name: decoded.name,
                    avatar: decoded.picture,
                },
            });

    } catch (error) {
        // console.log('chala 5 ');
        console.error("Google Login Error:", error);

        return res.status(401).json({
            successful: false,
            message: "Invalid Google token",
        });
    }
};
// 4. FORGOT PASSWORD (OTP bhejne ke liye)
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Isme bhi Otp model use kar sakte ho for consistency
        await Otp.findOneAndUpdate(
            { email },
            { otp, createdAt: Date.now() },
            { upsert: true, new: true }
        );

        await sendOtp(email, otp);
        res.status(200).json({ successful: true, message: "OTP sent to email" });
    } catch (err) {
        res.status(500).json({ message: "Error sending email" });
    }
};

// 5. RESET PASSWORD
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ successful: false, message: "All fields are required" });
        }

        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord || otpRecord.otp !== otp) {
            return res.status(400).json({ successful: false, message: "Invalid or expired OTP" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        await Otp.deleteOne({ email });

        return res.status(200).json({ successful: true, message: "Password Reset Successfully!" });
    } catch (err) {
        res.status(500).json({ successful: false, message: "Server Error" });
    }
};

// 6. CHANGE PASSWORD (Logged in users)
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log(userId);    
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId).select('+password');
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ successful: false, message: "Incorrect Old Password" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.status(200).json({ successful: true, message: "Password changed successfully!" });
    } catch (err) {
        res.status(500).json({ successful: false, message: "Server Error" });
    }
};

// 7. UPDATE ROLE (Admin Only)
const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ successful: true, message: `Role updated`, user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    sendOtpForRegistration,
    verifyAndRegister,
    loginUser,
    googleLogin,
    updateUserRole,
    changePassword,
    resetPassword,
    forgotPassword
};