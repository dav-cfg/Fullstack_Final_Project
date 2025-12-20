const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is not set in .env file');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI,{dbName: 'novy'});
    console.log('✅ MongoDB connected to novy DB...');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('Make sure MongoDB is running and MONGO_URI is correct');
    process.exit(1);
  }
};

module.exports = connectDB;