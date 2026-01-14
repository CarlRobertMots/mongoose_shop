const Order = require('../models/order');
const CartProduct = require('../models/cartProduct');
const Product = require('../models/product');

class OrderController {
    async createOrder(req, res) {
        try {
            const { paid, orderer } = req.body;

            let total = 0
            const products = await CartProduct.find().populate('product');
            for (const cartProduct of products) {
                console.log(cartProduct);
                
                if (cartProduct.product.stock < cartProduct.quantity) {
                    return res.status(400).json({ error: `Not enough stock for product ${cartProduct.product.name}` });
                }
                total += cartProduct.quantity * cartProduct.product.price;
            }
            // Deduct stock for each product in the cart
            for (const cartProduct of products) {
                const stockProduct = await Product.findById(cartProduct.product._id);
                stockProduct.stock -= cartProduct.quantity;
                await stockProduct.save();
            }   
            const created = new Date();

            const newOrder = new Order({ paid, total, created, orderer, products });
            console.log(newOrder);
            await newOrder.save();
            res.status(201).json((await newOrder.populate('orderer')));
        } catch (error) {
            res.status(500).json({ error: 'Failed to create order' });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Order.find().populate('orderer').populate('products').populate({ path: 'products', populate: { path: 'product' } });
            if (!orders) {
                return res.status(404).json({ error: 'No orders found' });
            }
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    }
}

module.exports = new OrderController();