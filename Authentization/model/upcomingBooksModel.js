const mongoose = require('mongoose');

const upcomingBookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    category: String,
    coverImageUrl: String,

    // --- PRE-LAUNCH SPECIFIC FIELDS ---
    expectedReleaseDate: {
        type: Date,
        required: true // Crucial so your frontend can build a Countdown Timer
    },
    preOrderPrice: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: "USD"
    },

    // Tracking how many Curators want this
    waitlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // Current phase of the manuscript
    launchStatus: {
        type: String,
        enum: ['TRANSMITTING', 'DECRYPTING', 'IMMINENT'],
        default: 'TRANSMITTING'
    },

    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('UpcomingBook', upcomingBookSchema);