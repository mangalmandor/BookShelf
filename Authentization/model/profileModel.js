const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User model se connection
        required: true,
        unique: true // Ek user ka ek hi profile hoga
    },
    profileImage: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 200
    },
    phone: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        default: "ujjain"
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);