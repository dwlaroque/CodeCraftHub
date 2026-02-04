const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user);
        return { user, token };
    }

    generateToken(user) {
        return jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = new AuthService();