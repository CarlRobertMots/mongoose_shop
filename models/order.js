const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  paid: {
    required: true,
    type: Boolean
  },
  total: {
    required: true,
    type: Number
  },
  created: {
    required: true,
    type: Date
  },
  orderer: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
  ,
  products: [{
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref: 'cartProducts'
  }]
})

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;