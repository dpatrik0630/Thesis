const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');

  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    req.user = decoded;
    console.log('Decoded User:', req.user);
    console.log('Decoded Token:', decoded)

    if (!req.user) {
      console.error('Error: req.user not set');
      return res.status(401).json({ message: 'Access denied. No user information.' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      // If the user is an admin, they have full access
      next();
    } else {
      // If the user is not an admin, restrict access to specific routes
      if (req.originalUrl.startsWith('/laundries')) {
        // For laundry routes, check if the user is the owner or related user
        if (user.id === req.user.id) {
          next();
        } else {
          return res.status(403).json({ message: 'Permission denied. Access to own laundry required.' });
        }
      } else {
        // For other routes, restrict access
        return res.status(403).json({ message: 'Permission denied. Admin access required.' });
      }
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;