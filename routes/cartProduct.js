const express = require('express');
const router = express.Router();
const CartProductController = require('../controllers/cartProduct');

router.post('/carts', CartProductController.addProductToCart);
router.get('/carts', CartProductController.getCartProducts);
router.put('/carts/:id', CartProductController.updateCartProduct);
router.delete('/carts/:id', CartProductController.deleteCartProduct);
   

module.exports = router;