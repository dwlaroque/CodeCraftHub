const jwt = require('jsonwebtoken');
const User = require('../models/User');
const responseUtil = require('../utils/responseUtil');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json(responseUtil.error('Access denied. No token provided.'));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json(responseUtil.error('Invalid token.'));
        next();
    } catch (error) {
        res.status(400).json(responseUtil.error('Invalid token.'));
    }
};

module.exports = authMiddleware;
