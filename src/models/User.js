const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    roles: [{ 
        type: mongoose.Schema.Types.ObjectId, // Reference to Role model
        ref: 'Role',
        default: ['user'] // Default role is 'user'
    }],
}, { 
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Hash password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt round of 10
    next(); // Proceed to save the user
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User; // Export the User model
