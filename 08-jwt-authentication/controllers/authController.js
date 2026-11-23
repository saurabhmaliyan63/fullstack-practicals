// ==============================================================
// Authentication Controller: Signup, Login & Profile Handlers
// ==============================================================

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_change_in_production_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// In-Memory User Store (simulating database table/collection)
const users = [];

// 1. SIGNUP: Register new user
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Name, email, and password are required fields.'
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({
        status: 'fail',
        message: 'An account with this email address already exists.'
      });
    }

    // Hash password with bcrypt (Salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: users.length + 1,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role && role.toLowerCase() === 'admin' ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Return response without exposing hashed password
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      status: 'success',
      message: 'Account registered successfully! You can now log in.',
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2. LOGIN: Authenticate user & issue JWT
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide both email and password.'
      });
    }

    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password.'
      });
    }

    // Compare plaintext password with stored bcrypt hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password.'
      });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      status: 'success',
      message: 'Authentication successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 3. GET PROFILE: Protected route handler
export const getProfile = (req, res) => {
  // req.user was attached by verifyToken middleware
  res.status(200).json({
    status: 'success',
    message: 'Welcome to your protected profile!',
    user: req.user
  });
};

// 4. ADMIN DASHBOARD: Role-restricted route handler
export const getAdminDashboard = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Hello Admin ${req.user.name}! You have authorized access to administrative controls.`,
    totalUsersCount: users.length,
    usersList: users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }))
  });
};
