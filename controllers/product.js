const Product = require('../models/product');

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, price, image, active, stock, category } = req.body;
      const created = new Date();
      const newProduct = new Product({ name, price, image, active, stock, created, category });
      console.log(newProduct);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.find().populate('category');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id).populate('category');
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}

module.exports = new ProductController();