// ==============================================================
// Authentication Routes (Public + Protected)
// ==============================================================

import express from 'express';
import {
  signup,
  login,
  getProfile,
  getAdminDashboard
} from '../controllers/authController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes (Require valid JWT Bearer token)
router.get('/profile', verifyToken, getProfile);

// Role-based Protected Route (Requires valid JWT AND 'admin' role)
router.get('/admin-dashboard', verifyToken, authorizeRoles('admin'), getAdminDashboard);

export default router;
