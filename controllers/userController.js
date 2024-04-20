const User = require('../models/user');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Attempting to log in with username:', username);

    // Check if the username exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      console.log('No user found with username:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('User found:', user);

    // Check if the password matches
    const isPasswordValid = await user.isValidPassword(password);

    if (!isPasswordValid) {
      console.log('Invalid password for username:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('Password validated successfully');

    // Generate access token
    const accessToken = jwt.generateToken({
      id: user._id,
      role: user.role,
    });

    console.log('Generated Token:', accessToken);

    // Send the access token in the response
    res.json({ accessToken });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
      res.status(200).json(req.user);
  } catch (error) {
      console.error('Error getting current user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role, permissions } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password, role, permissions },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getCurrentUser
};
