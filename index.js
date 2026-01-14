const express = require('express');
const db = require('./util/db');

const app = express();

app.use(express.json());

// Initialize database connection
db();

// Import routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cartProduct');
const orderRoutes = require('./routes/order');

// Use routes
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', orderRoutes);


// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});