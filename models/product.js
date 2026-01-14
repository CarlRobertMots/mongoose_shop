import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  quantity: { type: Number, required: true },
  ImageUrl: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  expiresAt: { type: Date, required: true },
  
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;