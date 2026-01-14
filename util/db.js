const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = db;