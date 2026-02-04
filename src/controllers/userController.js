const UserService = require('../services/userService');
const responseUtil = require('../utils/responseUtil');

exports.register = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await UserService.createUser(userData);
        res.status(201).json(responseUtil.success('User registered successfully', newUser));
    } catch (error) {
        res.status(400).json(responseUtil.error('Registration failed', error.message));
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await UserService.findUserById(req.user.id);
        if (!user) return res.status(404).json(responseUtil.error('User not found'));
        res.status(200).json(responseUtil.success(user));
    } catch (error) {
        res.status(500).json(responseUtil.error('Server error', error.message));
    }
};
