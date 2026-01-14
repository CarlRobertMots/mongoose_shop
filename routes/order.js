const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');

router.post('/orders', OrderController.createOrder);
router.get('/orders', OrderController.getAllOrders);
/* router.put('/carts/:id', CartProductController.updateCartProduct);
router.delete('/carts/:id', CartProductController.deleteCartProduct); */
   

module.exports = router;