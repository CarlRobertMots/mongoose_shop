const cartProduct = require('../models/cartProduct');
const Product = require('../models/product');

class CartProductController {
    async addProductToCart(req, res) {
        try {
            const { product, quantity } = req.body;
            const stockProduct = await Product.findById(product);
            console.log(stockProduct);
            if (!stockProduct) {
                return res.status(404).json({ error: 'Product not found' });
            } else if (stockProduct.stock < quantity) {
                return res.status(400).json({ error: 'Quantity of product is not enough to form order' });
            } else {
                const newCartProduct = new cartProduct({ product, quantity });
                await newCartProduct.save();
                res.status(201).json(newCartProduct);
            }
            
        } catch (error) {
            res.status(500).json({ error: 'Failed to create cart product' });
        }
    }

    async getCartProducts(req, res) {
        try {
            const cartProducts = await cartProduct.find().populate('product');
            if (!cartProducts) {
                return res.status(404).json({ error: 'Cart have not any products' });
            }
            res.status(200).json(cartProducts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch cart products' });
        }
    }

    async updateCartProduct(req, res) {
        try {
            const cartProductNeedUpdate = await cartProduct.findById(req.params.id);
            console.log(cartProductNeedUpdate);
            if (!cartProductNeedUpdate) {
                return res.status(404).json({ error: 'Cart product not found' });
            }
            if(req.body.quantity) {
                const stockProduct = await Product.findById(cartProductNeedUpdate.product._id);
                console.log(stockProduct);
                if (stockProduct.stock < req.body.quantity) {
                    return res.status(400).json({ error: 'Quantity of product is not enough to form order' });
                }
                cartProductNeedUpdate.quantity = req.body.quantity;
            }
            const updatedCartProduct = await cartProduct.findByIdAndUpdate(cartProductNeedUpdate._id, cartProductNeedUpdate, { new: true });
            res.status(200).json(updatedCartProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update cart product quantity' });
        }
    }

    async deleteCartProduct(req, res) {
        try {
            const deletedCartProduct = await cartProduct.findByIdAndDelete(req.params.id);
            if (!deletedCartProduct) {
                return res.status(404).json({ error: 'Cart product not found' });
            }
            res.status(200).json({ message: 'Cart product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete cart product' });
        }
    } 
}

module.exports = new CartProductController();   