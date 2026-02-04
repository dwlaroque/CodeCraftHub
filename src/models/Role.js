const mongoose = require('mongoose');

// Define the Role schema
const roleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String 
    },
}, { 
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the Role model
const Role = mongoose.model('Role', roleSchema);
module.exports = Role; // Export the Role model
