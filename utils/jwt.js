const jwt = require('jsonwebtoken');

/*const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100y' });
};*/

const generateToken = (payload) => {
    // Set the expiration time to 100 years from now
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 100);

    // Generate the token with the provided payload and expiration time
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100y' });

    // Log the expiration time
    console.log('Token will expire at:', expirationDate);
    
    return token;
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
