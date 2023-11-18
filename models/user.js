const mongoose = require('mongoose');
const jwt = require('../utils/jwt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    permissions: [{ type: String }]
});

userSchema.methods.generateToken = function () {
    return jwt.generateToken({
        id: this._id,
        username: this.username,
        role: this.role,
        permissions: this.permissions
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;