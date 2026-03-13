const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verification OTP",
            text: `Your OTP is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return true;
    } catch (error) {
        console.log("Email error:", error);
        return false;
    }
};

module.exports = sendOtp;