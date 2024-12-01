const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express(); 

// Middleware
app.use(cors(corsOptions));
app.use(bodyparser.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/emp', employeeRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
