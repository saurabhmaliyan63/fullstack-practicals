// ==============================================================
// Student REST Routes
// ==============================================================

import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats
} from '../controllers/studentController.js';

const router = express.Router();

// Aggregation Stats Route (Defined before :id to prevent matching 'stats' as an id)
router.get('/stats/summary', getStudentStats);

// Collection Routes
router.route('/')
  .get(getAllStudents)
  .post(createStudent);

// Single Item Resource Routes
router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
