// validationMiddleware.js
const { body, validationResult } = require('express-validator');

// Example of a validation rule
const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { loginValidation, validate };