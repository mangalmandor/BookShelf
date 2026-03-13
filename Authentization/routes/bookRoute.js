const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, addUpcomingBook, getUpcomingBooks } = require('../controller/bookController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware'); // Your existing auth logic

// Public/User Routes
router.get('/read-books', isAuthenticated, getAllBooks);
router.get('/read-upcoming-books', isAuthenticated, getUpcomingBooks);
router.get('/BookById/:id', isAuthenticated, getBookById);

// Admin Only Routes
router.post('/write-books', isAuthenticated, isAdmin, createBook);
router.post('/write-upcoming-books', isAuthenticated, isAdmin, addUpcomingBook);

module.exports = router;