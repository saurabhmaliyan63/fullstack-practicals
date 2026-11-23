// ==============================================================
// E-Commerce Order Routes
// ==============================================================

import express from 'express';

const router = express.Router();

// In-Memory Orders Database
const orders = [];

// 1. POST /api/orders (Place an order)
router.post('/', (req, res) => {
  const { customer, items, shippingAddress, paymentMethod } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Cart cannot be empty to place an order.'
    });
  }

  // Calculate pricing breakdown
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = +(subtotal * 0.08).toFixed(2); // 8% sales tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = +(subtotal + tax + shipping).toFixed(2);

  const newOrder = {
    orderId: 'ORD-' + Date.now().toString().slice(-6),
    customer: customer || { name: 'Guest Customer', email: 'guest@example.com' },
    items,
    shippingAddress: shippingAddress || 'Standard Delivery Address',
    paymentMethod: paymentMethod || 'Credit Card',
    pricing: {
      subtotal: +subtotal.toFixed(2),
      tax,
      shipping,
      total
    },
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);

  res.status(201).json({
    status: 'success',
    message: 'Order placed successfully!',
    order: newOrder
  });
});

// 2. GET /api/orders (List past orders)
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    count: orders.length,
    orders
  });
});

export default router;
