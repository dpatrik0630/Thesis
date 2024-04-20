require('dotenv').config({ path: './secretkey.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const laundryRoutes = require('./routes/laundryRoutes');
const relatedPeopleRoutes = require('./routes/relatedPeopleRoutes');
const auth = require('./middleware/auth');
const jwt = require('./utils/jwt');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/laundries', auth);
app.use('/users', auth);
app.use('/laundries', laundryRoutes);
app.use('/users', userRoutes);
app.use('/relatedpeople', relatedPeopleRoutes);

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
  }));


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
        const user = await User.findById('6516b5ea5f206abb60c6a16a');
        if (!user) {
            console.error('User not found');
            return;
        }

        const payload = { 
            id: user._id.toHexString(),
            role: user.role,
            permissions: user.permissions
        };
        const token = jwt.generateToken(payload);
        console.log('Generated Token:', token);
    } catch (error) {
        console.error('Error generating token:', error);
    }
});

// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
