const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        // 1. Token ko pehle Cookies se dhoondo, phir Headers se
        // Note: req.cookies tabhi chalega jab aapne backend me 'cookie-parser' use kiya ho
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer") ? req.headers.authorization.split(" ")[1] : null);

        if (!token) {
            return res.status(401).json({
                success: false, // Yahan 'successful' ko 'success' kar raha hoon backend consistency ke liye
                message: "Access Denied! No token provided in cookies or headers."
            });
        }

        // 2. Verify Token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // 3. Attach User to Request
        req.user = decoded;

        next();

    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
};

// Admin check wala part sahi hai
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        return res.status(403).json({
            success: false,
            message: "Access Denied! Admins only can access."
        });
    }
};

module.exports = { isAuthenticated, isAdmin };