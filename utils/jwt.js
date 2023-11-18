const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './secretkey.env' });

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyTokenStructure = (token) => {
  const tokenParts = token.split('.');
  return tokenParts.length === 3;
};

module.exports = {
  generateToken,
  verifyToken,
  verifyTokenStructure,
};
