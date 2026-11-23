// ==============================================================
// E-Commerce Product Routes
// ==============================================================

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper to load products from disk
function loadProducts() {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
}

// 1. GET /api/products (supports category & search query)
router.get('/', (req, res) => {
  try {
    let products = loadProducts();
    const { category, search, maxPrice } = req.query;

    if (category && category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const term = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    res.status(200).json({
      status: 'success',
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 2. GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const products = loadProducts();
    const product = products.find(p => p.id === parseInt(req.params.id, 10));

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: `Product with ID ${req.params.id} not found.`
      });
    }

    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
