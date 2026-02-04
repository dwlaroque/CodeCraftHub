const { body, validationResult } = require('express-validator');
const responseUtil = require('../utils/responseUtil');

const registerValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(responseUtil.error('Validation failed', errors.array()));
    }
    next();
};

module.exports = { registerValidation, validate };

