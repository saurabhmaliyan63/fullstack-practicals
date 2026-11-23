// ==============================================================
// Practical 4: Server-Side Setup with Express.js & Basic Routing
// ==============================================================

import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. BUILT-IN MIDDLEWARE
// Parse incoming JSON payloads and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CUSTOM APPLICATION-LEVEL MIDDLEWARE (Request Logger)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request to ${req.originalUrl}`);
  next(); // Pass control to the next middleware or route handler
});

// Sample In-Memory Data Store
let items = [
  { id: 1, name: 'Web Development Bootcamp', category: 'Education' },
  { id: 2, name: 'Mechanical Keyboard', category: 'Hardware' },
  { id: 3, name: 'Ergonomic Desk Chair', category: 'Furniture' }
];

// 3. BASIC ROUTING

// Root Route: GET /
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Express.js Basic Routing API!',
    availableRoutes: [
      'GET /',
      'GET /about',
      'GET /api/items',
      'GET /api/items/:id',
      'POST /api/items',
      'PUT /api/items/:id',
      'DELETE /api/items/:id',
      'GET /search?q=term'
    ]
  });
});

// Static Information Route: GET /about
app.get('/about', (req, res) => {
  res.json({
    app: 'Express.js Practical Showcase',
    version: '1.0.0',
    description: 'Demonstrating HTTP methods, params, query strings & middleware.'
  });
});

// Route with Query Parameters: GET /search?q=...
// Example: http://localhost:5000/search?q=chair
app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({
      error: 'Query parameter "q" is required (e.g., /search?q=keyboard)'
    });
  }

  const results = items.filter(item =>
    item.name.toLowerCase().includes(q.toLowerCase()) ||
    item.category.toLowerCase().includes(q.toLowerCase())
  );

  res.json({
    query: q,
    resultsCount: results.length,
    results
  });
});

// GET all items: GET /api/items
app.get('/api/items', (req, res) => {
  res.json({
    total: items.length,
    data: items
  });
});

// Route with Route Parameters: GET /api/items/:id
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const foundItem = items.find(item => item.id === itemId);

  if (!foundItem) {
    return res.status(404).json({
      error: `Item with ID ${itemId} was not found.`
    });
  }

  res.json({ data: foundItem });
});

// POST Route: Create a new item
app.post('/api/items', (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      error: 'Both "name" and "category" fields are required in the request body.'
    });
  }

  const newItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    name,
    category
  };

  items.push(newItem);

  res.status(201).json({
    message: 'Item created successfully!',
    data: newItem
  });
});

// PUT Route: Update an existing item
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const index = items.findIndex(item => item.id === itemId);

  if (index === -1) {
    return res.status(404).json({ error: `Item with ID ${itemId} not found.` });
  }

  const { name, category } = req.body;
  items[index] = {
    ...items[index],
    name: name || items[index].name,
    category: category || items[index].category
  };

  res.json({
    message: `Item ${itemId} updated successfully!`,
    data: items[index]
  });
});

// DELETE Route: Delete an item by ID
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const index = items.findIndex(item => item.id === itemId);

  if (index === -1) {
    return res.status(404).json({ error: `Item with ID ${itemId} not found.` });
  }

  const deletedItem = items.splice(index, 1)[0];
  res.json({
    message: `Item ${itemId} deleted successfully.`,
    data: deletedItem
  });
});

// 4. 404 NOT FOUND MIDDLEWARE
app.use((req, res, next) => {
  res.status(404).json({
    error: '404 Not Found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist.`
  });
});

// 5. GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Express server running at: http://localhost:${PORT}`);
});
