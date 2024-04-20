const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    permissions: [{ type: String }]
});

userSchema.pre('save', async function(next) {
  try {
    console.log('Pre-save hook triggered for user:', this.username);
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    const trimmedPassword = password.trim();
    const trimmedDatabasePassword = this.password.trim();

    console.log('Trimmed password from login:', trimmedPassword);
    console.log('Trimmed password from database:', trimmedDatabasePassword);

    const isPasswordValid = trimmedPassword === trimmedDatabasePassword;
    console.log('Password comparison result:', isPasswordValid);

    return isPasswordValid;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
