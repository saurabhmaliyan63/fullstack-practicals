// ==============================================================
// Practical 5: Student Management System REST API Server
// ==============================================================

import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root Information Endpoint
app.get('/', (req, res) => {
  res.json({
    project: 'Student Management CRUD REST API',
    endpoints: {
      getAllStudents: 'GET /api/students',
      filterByCourse: 'GET /api/students?course=Computer%20Science',
      filterByGpa: 'GET /api/students?minGpa=3.5',
      getById: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
      getStatistics: 'GET /api/students/stats/summary'
    }
  });
});

// Mount Student API Routes
app.use('/api/students', studentRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find route ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🎓 Student Management API running at: http://localhost:${PORT}`);
});
