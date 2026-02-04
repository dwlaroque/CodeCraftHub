const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./config/logger');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ status: 'error', message: 'Server error' });
});

module.exports = app;
