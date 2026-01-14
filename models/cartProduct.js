const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
  product: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  },
  quantity: {
    required: true,
    type: Number
  }
})

const cartProductModel = mongoose.model('cartProducts', cartProductSchema);

module.exports = cartProductModel;