const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: String,
    description: String,
    category: String,
    coverImageUrl: String,
    contentUrl: String,
    publishedDate: Date,
    pageCount: Number,
    price: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: "USD"
    },
    language: String,
    isAvailable: { type: Boolean, default: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);