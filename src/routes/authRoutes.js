const express = require('express');
const { login } = require('../controllers/authController'); // Correctly import the login function
const { loginValidation, validate } = require('../middleware/validationMiddleware');

const router = express.Router();

// User login route
router.post('/login', loginValidation, validate, login); // Ensure 'login' is defined

module.exports = router;