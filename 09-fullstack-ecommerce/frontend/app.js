// ==============================================================
// Practical 9: E-Commerce Store Frontend Logic
// Features: Dynamic product rendering, LocalStorage cart,
//           Slide drawer, Checkout modal & Backend API integration
// ==============================================================

const API_BASE = 'http://localhost:5005/api';

// Fallback seed catalog in case backend server is offline
const FALLBACK_PRODUCTS = [
  { id: 1, name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 149.99, rating: 4.8, emoji: "🎧", description: "High-fidelity audio with active noise cancellation." },
  { id: 2, name: "Ergonomic Mechanical Keyboard", category: "Electronics", price: 89.99, rating: 4.9, emoji: "⌨️", description: "Custom mechanical switches with magnetic wrist rest." },
  { id: 3, name: "Ultra-Wide Gaming Monitor 34\"", category: "Electronics", price: 379.99, rating: 4.7, emoji: "🖥️", description: "Curved 144Hz display with vivid HDR400 color gamut." },
  { id: 4, name: "Minimalist Ceramic Coffee Mug", category: "Home & Kitchen", price: 18.50, rating: 4.6, emoji: "☕", description: "Handcrafted matte ceramic finish with ergonomic grip." },
  { id: 5, name: "Stainless Steel Thermal Water Bottle", category: "Home & Kitchen", price: 24.99, rating: 4.5, emoji: "🧊", description: "Double-wall vacuum insulation keeps drinks cold for 24h." },
  { id: 6, name: "Smart Fitness & Health Watch", category: "Wearables", price: 129.00, rating: 4.7, emoji: "⌚", description: "Heart rate tracking, sleep analytics, and GPS workouts." },
  { id: 7, name: "Eco Canvas Laptop Backpack", category: "Accessories", price: 54.00, rating: 4.8, emoji: "🎒", description: "Weather-resistant recycled fabric with 16\" laptop sleeve." },
  { id: 8, name: "Desk Ambient LED Light Bar", category: "Accessories", price: 39.99, rating: 4.6, emoji: "💡", description: "Screen-mounting monitor light bar with zero screen glare." }
];

// App State
let products = [];
let cart = JSON.parse(localStorage.getItem('novastore_cart')) || [];
let activeCategory = 'All';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoryPills = document.getElementById('categoryPills');
const searchInput = document.getElementById('searchInput');
const cartBadge = document.getElementById('cartBadge');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCountTitle = document.getElementById('cartCountTitle');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTax = document.getElementById('cartTax');
const cartTotal = document.getElementById('cartTotal');
const openCheckoutBtn = document.getElementById('openCheckoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutDueAmount = document.getElementById('checkoutDueAmount');
const orderSuccessModal = document.getElementById('orderSuccessModal');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const receiptBox = document.getElementById('receiptBox');
const apiStatusDot = document.querySelector('.status-dot');
const statusText = document.getElementById('statusText');

// 1. Fetch products from Backend API (with fallback)
async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Backend responded with error');
    const json = await res.json();
    products = json.data;
    apiStatusDot.classList.add('online');
    statusText.textContent = 'Backend API Connected (Port 5005)';
  } catch (err) {
    console.warn('Backend not detected, loading fallback local catalog:', err.message);
    products = FALLBACK_PRODUCTS;
    apiStatusDot.classList.remove('online');
    statusText.textContent = 'Demo Mode (Run backend for live API)';
  }
  renderProducts();
}

// 2. Render Products
function renderProducts() {
  const filtered = products.filter(p => {
    const matchCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <h3>No matching products found</h3>
        <p>Try searching for other keywords or select a different category.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-emoji-banner">${p.emoji || '📦'}</div>
      <div class="product-content">
        <div class="product-meta">
          <span class="product-category">${p.category}</span>
          <span class="product-rating">★ ${p.rating || 4.5}</span>
        </div>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="btn-add-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join('');
}

// 3. Cart Management
window.addToCart = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCartDrawer();
};

window.updateQty = function(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  renderCart();
};

window.removeFromCart = function(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCart();
};

function saveCart() {
  localStorage.setItem('novastore_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalCount;
  cartCountTitle.textContent = totalCount;
}

function renderCart() {
  updateCartBadge();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); margin-top: 3rem;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛒</div>
        <p>Your shopping cart is empty.</p>
      </div>
    `;
    cartSubtotal.textContent = '$0.00';
    cartTax.textContent = '$0.00';
    cartTotal.textContent = '$0.00';
    openCheckoutBtn.disabled = true;
    openCheckoutBtn.style.opacity = '0.5';
    return;
  }

  openCheckoutBtn.disabled = false;
  openCheckoutBtn.style.opacity = '1';

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji || '📦'}</span>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
        <span class="item-qty">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remove item">🗑️</button>
      </div>
    </div>
  `).join('');

  // Calculations
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartTax.textContent = `$${tax.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;
  checkoutDueAmount.textContent = `$${total.toFixed(2)}`;
}

// 4. Cart Drawer Toggles
function openCartDrawer() {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
}

openCartBtn.addEventListener('click', openCartDrawer);
closeCartBtn.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

// 5. Category Filtering
categoryPills.addEventListener('click', (e) => {
  if (e.target.classList.contains('pill')) {
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    activeCategory = e.target.dataset.category;
    renderProducts();
  }
});

// 6. Search Bar Live Event
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderProducts();
});

// 7. Checkout Flow
openCheckoutBtn.addEventListener('click', () => {
  closeCartDrawer();
  checkoutModal.classList.add('active');
});

closeCheckoutBtn.addEventListener('click', () => {
  checkoutModal.classList.remove('active');
});

// Handle Order Form Submit
checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const orderPayload = {
    customer: {
      name: document.getElementById('custName').value.trim(),
      email: document.getElementById('custEmail').value.trim()
    },
    shippingAddress: document.getElementById('custAddress').value.trim(),
    paymentMethod: document.getElementById('custPayment').value,
    items: cart
  };

  let createdOrder = null;

  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (res.ok) {
      const data = await res.json();
      createdOrder = data.order;
    }
  } catch (err) {
    console.warn('Backend unavailable for order POST, using client-side order simulation:', err);
  }

  // Fallback order generation if backend is offline
  if (!createdOrder) {
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const tax = subtotal * 0.08;
    createdOrder = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customer: orderPayload.customer,
      items: cart,
      pricing: { subtotal, tax, total: subtotal + tax },
      createdAt: new Date().toLocaleString()
    };
  }

  // Display Receipt
  receiptBox.textContent = `
========================================
           NOVASTORE RECEIPT            
========================================
Order ID:   ${createdOrder.orderId}
Date:       ${new Date().toLocaleString()}
Customer:   ${createdOrder.customer.name} (${createdOrder.customer.email})
Payment:    ${orderPayload.paymentMethod}

ITEMS:
${cart.map(i => ` • ${i.name.padEnd(30).slice(0, 30)} x${i.quantity}  $${(i.price * i.quantity).toFixed(2)}`).join('\n')}

Subtotal:   $${createdOrder.pricing.subtotal.toFixed(2)}
Tax (8%):   $${createdOrder.pricing.tax.toFixed(2)}
Total Paid: $${createdOrder.pricing.total.toFixed(2)}
========================================
Status: Paid & Ready for Fulfillment
  `.trim();

  // Reset cart
  cart = [];
  saveCart();
  renderCart();

  checkoutModal.classList.remove('active');
  orderSuccessModal.classList.add('active');
});

closeSuccessBtn.addEventListener('click', () => {
  orderSuccessModal.classList.remove('active');
});

// Initialize on Load
fetchProducts();
renderCart();
