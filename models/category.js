import mongoose from 'mongoose';

const catergorySchema = new mongoose.Schema({
  name: { type: String, required: true }
  
});

module.exports = mongoose.model('Category', catergorySchema);