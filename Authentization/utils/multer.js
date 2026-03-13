const multer = require('multer');
const path = require('path');

// 1. Storage Configuration: File kahan aur kis naam se save hogi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 'uploads/' folder backend root mein hona chahiye
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Har file ko unique naam dene ke liye: current timestamp + original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. File Filter: Sirf Images allow karne ke liye
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only Images (jpeg, jpg, png, webp) are allowed!'));
    }
};

// 3. Multer Instance banayein
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
    fileFilter: fileFilter
});

module.exports = upload;