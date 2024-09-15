const mongoose = require('mongoose');

//MongoDB URI for Mongo atlas, use this to test locally: 'mongodb://localhost:27017/your-database')
const mongoURI = 'mongodb+srv://savvymarshall:duckies43@project3cluster.h5vfp.mongodb.net/?retryWrites=true&w=majority&appName=project3cluster';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
