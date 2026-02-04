const User = require('../models/User');
const Role = require('../models/Role');

class UserService {
    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async findUserById(userId) {
        return await User.findById(userId).select('-password'); // Exclude password from the result
    }

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async assignRolesToUser(userId, roles) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        
        user.roles = roles; // Assign new roles
        await user.save();
        return user;
    }
}

module.exports = new UserService();