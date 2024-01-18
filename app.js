require('dotenv').config({
  path: './secretkey.env'
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const laundryRoutes = require('./routes/laundryRoutes');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./models/user');


const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use('/laundries', auth);
app.use('/users', auth);
app.use('/laundries', laundryRoutes);
app.use('/users', userRoutes);

const MONGODB_URI = 'mongodb+srv://user:asdasd123@thesis.wvtrbis.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    const user = await User.findById('6516b5ea5f206abb60c6a16a'); // Replace '1' with the actual user ID
    if (!user) {
      console.error('User not found');
      return;
    }

    const payload = { 
      id: user._id.toHexString(),
      role: user.role, // Add the user's role to the payload
      permissions: user.permissions // Add the user's permissions to the payload
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log('Generated Token:', token);
  } catch (error) {
    console.error('Error generating token:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

exports.handler = async (event, context) => {
  // Your Lambda logic goes here

  return {
    statusCode: 200,
    body: JSON.stringify('Lambda function executed successfully'),
  };
};
