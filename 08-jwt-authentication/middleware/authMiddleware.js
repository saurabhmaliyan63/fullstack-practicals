// ==============================================================
// JWT Authentication & Role Authorization Middleware
// ==============================================================

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_change_in_production_2026';

// Middleware to verify JWT token in request headers
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expected Header: "Authorization: Bearer <TOKEN>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'fail',
      message: 'Access Denied: No Bearer token provided in Authorization header.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded payload { id, email, role } to request
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid or expired token. Please log in again.'
    });
  }
};

// Middleware to restrict access to specific roles (e.g. 'admin')
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: `Forbidden: User role '${req.user?.role || 'Guest'}' is not authorized to access this resource.`
      });
    }
    next();
  };
};
