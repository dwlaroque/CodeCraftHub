const AuthService = require('../services/authService');
const responseUtil = require('../utils/responseUtil');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await AuthService.login(email, password);
        res.status(200).json(responseUtil.success({ user, token }));
    } catch (error) {
        res.status(401).json(responseUtil.error('Login failed', error.message));
    }
};