const User = require('../models/user');
const jwt = require('../utils/jwt');

const registerUser = async (req, res) => {
  const { username, password, role, permissions } = req.body;

  try {
    const user = new User({ username, password, role, permissions });
    await user.save();
    const token = jwt.generateToken({ 
      id: user._id,
    role: user.role 
  });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  registerUser,
  getAllUsers,
  deleteUser,
  updateUser
};
