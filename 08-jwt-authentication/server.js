// ==============================================================
// Practical 8: JWT Authentication Express Server
// ==============================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// API Overview
app.get('/', (req, res) => {
  res.json({
    project: 'JWT Authentication with Bcrypt & Role-Based Access Control',
    endpoints: {
      signup: 'POST /api/auth/signup',
      login: 'POST /api/auth/login',
      getProfile: 'GET /api/auth/profile (Headers: Authorization: Bearer <token>)',
      adminDashboard: 'GET /api/auth/admin-dashboard (Headers: Authorization: Bearer <admin_token>)'
    }
  });
});

// Mount Authentication Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🔒 JWT Authentication server running at: http://localhost:${PORT}`);
});
