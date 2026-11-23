// ==============================================================
// Practical 6: Express API with MySQL Database Integration
// ==============================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import { testDbConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// API Info endpoint
app.get('/', (req, res) => {
  res.json({
    project: 'Express + MySQL Database Integration',
    database: process.env.DB_NAME || 'college_db',
    endpoints: {
      getAll: 'GET /api/mysql-students',
      getOne: 'GET /api/mysql-students/:id',
      create: 'POST /api/mysql-students',
      update: 'PUT /api/mysql-students/:id',
      delete: 'DELETE /api/mysql-students/:id'
    }
  });
});

// Mount Routes
app.use('/api/mysql-students', studentRoutes);

// Start Server and verify DB Connection
app.listen(PORT, async () => {
  console.log(`🐬 MySQL API server listening on: http://localhost:${PORT}`);
  await testDbConnection();
});
