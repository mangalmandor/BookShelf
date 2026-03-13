const Profile = require('../model/profileModel');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- HELPER FUNCTION TO DELETE FILES ---
const deleteFile = (filePath) => {
    if (filePath) {
        const fullPath = path.join(__dirname, '..', filePath);
        if (fs.existsSync(fullPath)) {
            try {
                fs.unlinkSync(fullPath);
                console.log(`Deleted: ${filePath}`);
            } catch (err) {
                console.error(`Error deleting file ${filePath}:`, err.message);
            }
        }
    }
};

// 1. SET/UPDATE PROFILE
const setProfile = async (req, res) => {
    try {
        const { bio, phone, location } = req.body;
        const userId = req.user?.id;

        // Pehle purana profile dhoondo taaki purani photo ka path mil sake
        const oldProfile = await Profile.findOne({ user: userId });

        let updateData = { user: userId };

        if (bio) updateData.bio = bio;
        if (phone) updateData.phone = phone;
        if (location) updateData.location = location;

        // Note: Agar user ne pehli baar setup kiya hai aur location nahi bheji
        if (!oldProfile && !location) {
            updateData.location = "Earth";
        }

        if (req.file) {
            // Naya filename aur path set karo
            const processedFileName = `processed-${Date.now()}-${req.file.originalname.split('.')[0]}.jpeg`;
            const processedPath = `uploads/${processedFileName}`;

            // --- SHARP LOGIC START ---
            // Nayi photo ko compress aur resize karo
            await sharp(req.file.path)
                .resize(500, 500, {
                    fit: 'cover',
                    position: 'center'
                })
                .toFormat('jpeg', { quality: 90 })
                .toFile(processedPath);
            // --- SHARP LOGIC END ---

            // --- CLEANUP LOGIC ---

            // A. Purani image delete karo agar database mein pehle se thi
            if (oldProfile && oldProfile.profileImage) {
                deleteFile(oldProfile.profileImage);
            }

            // B. Multer ne jo original upload ki thi (raw), use delete karo
            // Kyunki ab hamare paas 'processed' wali image aa gayi hai
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }

            // Path fix for database
            updateData.profileImage = processedPath.replace(/\\/g, "/");
        }

        const profile = await Profile.findOneAndUpdate(
            { user: userId },
            { $set: updateData },
            { returnDocument: 'after', upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            data: profile
        });

    } catch (error) {
        // Agar process beech mein fail ho jaye, toh uploaded file saaf karo
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. GET PROFILE
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // User ID se profile dhoondo aur User model se name/email bhi populate karo
        const profile = await Profile.findOne({ user: userId }).populate('user', 'name email');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found. Please setup your profile."
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getProfile, setProfile };