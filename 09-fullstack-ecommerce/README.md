# Practical 9: Full Stack Project – E-Commerce Web Store

## Aim
Design and develop an end-to-end full stack e-commerce web application featuring a modern, responsive frontend (product catalog, dynamic search, category filtering, slide-out cart drawer, checkout modal) connected to an Express.js REST API backend for products and order processing.

## Architecture & Features
1. **Frontend**:
   - Modern glassmorphism UI with responsive CSS Grid and Flexbox.
   - Dynamic product search and instant category filter pills.
   - Cart Drawer with live item quantity updates, removal, and price calculations (subtotal, 8% tax, free shipping rules).
   - LocalStorage persistence (cart items remain across browser reloads).
   - Checkout modal with customer details, simulated payment, and formatted receipt invoice generation.
   - Resilient design: smoothly connects to the backend API, with automatic graceful fallback if the backend is not started.
2. **Backend**:
   - Express server handling CORS and JSON payloads.
   - `GET /api/products`: Full catalog with search and category filtering query parameters.
   - `GET /api/products/:id`: Specific product detail endpoint.
   - `POST /api/orders`: Order placement engine with tax calculation, order ID generation, and validation.
   - `GET /api/orders`: Past order history log.

## Project Structure
```
09-fullstack-ecommerce/
├── backend/
│   ├── package.json          # Backend dependencies
│   ├── server.js             # Express server on port 5005
│   ├── data/
│   │   └── products.json     # Product catalog database
│   └── routes/
│       ├── productRoutes.js  # Product listing & filter routes
│       └── orderRoutes.js    # Order processing routes
├── frontend/
│   ├── index.html            # Store UI layout & modals
│   ├── style.css             # Glassmorphic responsive styling
│   └── app.js                # State management, cart & API client
└── README.md                 # Full stack setup & execution guide
```

## How to Run

### Step 1: Start the Backend Server
1. Open terminal and navigate to `backend`:
   ```bash
   cd "09-fullstack-ecommerce/backend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *The backend will run on `http://localhost:5005`.*

### Step 2: Open the Frontend
- Simply open [frontend/index.html](file:///d:/Programs/fullstack%20pratical/09-fullstack-ecommerce/frontend/index.html) in your browser!
- Notice the green badge: **"Backend API Connected (Port 5005)"**.
- Add items to the cart, adjust quantities, open the cart drawer, and click **"Proceed to Checkout"** to test the complete order workflow!
