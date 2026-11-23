// ==============================================================
// MySQL Student API Routes
// ==============================================================

import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentDbController.js';

const router = express.Router();

router.route('/')
  .get(getAllStudents)
  .post(createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
