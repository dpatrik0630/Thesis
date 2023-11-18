require('dotenv').config({
  path: './secretkey.env'
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const laundryRoutes = require('./routes/laundryRoutes');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use('/laundries', laundryRoutes);
app.use('/users', userRoutes);

const MONGODB_URI = 'mongodb+srv://user-1:Xy45PE96@thesis.wvtrbis.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  const payload = { id: '1' }; // Replace with actual payload
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  console.log('Generated Token:', token);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
