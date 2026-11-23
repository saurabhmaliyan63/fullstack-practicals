// ==============================================================
// Practical 9: E-Commerce Store Backend Server
// ==============================================================

import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 5005;

// Enable CORS for frontend integration
app.use(cors());
app.use(express.json());

// API Info endpoint
app.get('/', (req, res) => {
  res.json({
    project: 'Full Stack E-Commerce Store Backend API',
    endpoints: {
      getAllProducts: 'GET /api/products',
      filterProducts: 'GET /api/products?category=Electronics&search=mouse',
      getProductById: 'GET /api/products/:id',
      createOrder: 'POST /api/orders',
      getOrders: 'GET /api/orders'
    }
  });
});

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`🛒 E-Commerce Backend Server running at: http://localhost:${PORT}`);
});
