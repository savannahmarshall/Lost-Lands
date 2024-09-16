require('dotenv').config();
const mongoose = require('mongoose');

// Use MongoDB URI from environment variable or fallback to local MongoDB if not found
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/loginDB';

console.log('MongoDB URI being used:', mongoURI);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to', mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
