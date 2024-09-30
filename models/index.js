const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model('admin', adminSchema);