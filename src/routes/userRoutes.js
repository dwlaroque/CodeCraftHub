const express = require('express');
const { register, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { registerValidation, validate } = require('../middleware/validationMiddleware');

const router = express.Router();

// User registration route
router.post('/register', registerValidation, validate, register);

// Get user profile route (requires authentication)
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
