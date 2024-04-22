const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 100);

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100y' });

    console.log('Token will expire at:', expirationDate);
    
    return token;
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
