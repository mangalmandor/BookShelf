const Book = require('../model/booksModel');
const UpcomingBook = require('../model/upcomingBooksModel');

const createBook = async (req, res) => {
    try {
        // 1. Safety Check: Is req.user even there?
        // If your middleware fails, req.user might be undefined
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user data found." });
        }

        // 2. Role Check
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied: Admin privileges required." });
        }

        const { title, author, isbn, description, category, contentUrl, coverImageUrl, price, language, currency, publishedDate, pageCount } = req.body;

        // 3. Validation: Ensure required fields aren't empty
        if (!title || !author || !contentUrl) {
            return res.status(400).json({ message: "Missing required fields: Title, Author, or Content URL." });
        }

        const newBook = new Book({
            title,
            author,
            isbn,
            description,
            category,
            contentUrl,
            coverImageUrl,
            price,
            language,
            publishedDate,
            pageCount,
            currency,
            addedBy: req.user.id || req.user._id
        });

        const savedBook = await newBook.save();

        // 4. Return the saved book for immediate UI update
        res.status(201).json({
            success: true,
            message: "Book added to Archive successfully!",
            book: savedBook
        });

    } catch (error) {
        console.error("Create Book Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error during book injection",
            error: error.message
        });
    }
};

// 2. USER/ADMIN: Get All Books (List view)
const getAllBooks = async (req, res) => {
    try {
        // Remove the .select() part to get all fields from the database
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};

// 3. USER/ADMIN: Get Single Book Details (Reading view)
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
};

//upcomingbook controller

const addUpcomingBook = async (req, res) => {
    try {
        // 1. Extract the data payload from the frontend
        const {
            title,
            author,
            category,
            coverImageUrl,
            description,
            expectedReleaseDate,
            preOrderPrice,
            currency,
            launchStatus
        } = req.body;

        // 2. Build the Upcoming Book object
        const newUpcomingBook = new UpcomingBook({
            title,
            author,
            category,
            coverImageUrl,
            description,
            expectedReleaseDate,
            preOrderPrice,
            currency,
            launchStatus,
            // Automatically log which Admin scheduled this launch
            addedBy: req.user.id || req.user._id
        });

        // 3. Save to the Grand Archive
        await newUpcomingBook.save();

        // 4. Send the success signal back to the React terminal
        res.status(201).json({
            success: true,
            message: "Pre-launch sequence initiated successfully.",
            data: newUpcomingBook
        });

    } catch (error) {
        console.error("Launch Scheduling Error:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to schedule the upcoming manuscript."
        });
    }
};

//getUpcomingBook Controller
const getUpcomingBooks = async (req, res) => {
    try {
        // Fetch all upcoming books. 
        // .sort({ expectedReleaseDate: 1 }) organizes them from earliest launch to latest.
        const upcomingBooks = await UpcomingBook.find()
            .sort({ expectedReleaseDate: 1 });

        // If you only want to show books that haven't launched yet, you could use:
        // const upcomingBooks = await UpcomingBook.find({ expectedReleaseDate: { $gt: new Date() } }).sort({ expectedReleaseDate: 1 });

        res.status(200).json({
            success: true,
            count: upcomingBooks.length,
            data: upcomingBooks
        });

    } catch (error) {
        console.error("Archive Retrieval Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve the upcoming launch schedule."
        });
    }
};

module.exports = { createBook, getAllBooks, getBookById, addUpcomingBook, getUpcomingBooks };