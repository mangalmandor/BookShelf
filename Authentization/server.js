const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const dbConnect = require('./config/db');
const userRouter = require('./routes/userRoute');
const profileRouter = require('./routes/profileRoute');
const bookRouter = require('./routes/bookRoute');
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173', // Aapka frontend URL (Wildcard '*' nahi chalega cookies ke saath)
  credentials: true,               // Ye browser ko cookies accept karne ki permission deta hai
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is running');
});

dbConnect();

app.use('/api', userRouter)
app.use('/api/profile', profileRouter);
app.use('/api/books', bookRouter);
app.use('/uploads', express.static('uploads'));

app.listen(PORT || 4000, () => {
  console.log(`Server running on port ${PORT}`);
});
