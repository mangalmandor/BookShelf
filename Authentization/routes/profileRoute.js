const express = require('express');
const profileRouter = express.Router();
const { getProfile, setProfile } = require('../controller/profileController');

const upload = require('../utils/multer');
const { isAuthenticated } = require('../middleware/authMiddleware');

// --- ROUTES SETUP ---

profileRouter.get('/get-profile', isAuthenticated, getProfile);

profileRouter.post('/set-profile', isAuthenticated, upload.single('profileImage'), setProfile);

// profileRouter.post('/update-profile', isAuthenticated, upload.single('profileImage'), updateProfile);

module.exports = profileRouter ;