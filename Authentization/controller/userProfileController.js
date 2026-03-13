const User = require('../model/userModel')
const getMyProfile = async (req, res) => {
    try {

        const userId = req.user.userId;
        const userData = await User.findById({ _id: userId }).select("-password -otp");

        if (!userData) {
            return res.status(404).json({
                successful: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            successful: true,
            user: userData
        });

    } catch (error) {
        res.status(500).json({ successful: false, message: "Server Error" });
    }
}

module.exports =  {getMyProfile};