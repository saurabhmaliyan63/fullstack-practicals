// ==============================================================
// Student Controller: Request Handlers with Input Validation
// ==============================================================

import { StudentModel } from '../models/studentModel.js';

// GET /api/students
export const getAllStudents = (req, res) => {
  const { course, minGpa } = req.query;
  const students = StudentModel.findAll({ course, minGpa });

  res.status(200).json({
    status: 'success',
    count: students.length,
    data: students
  });
};

// GET /api/students/:id
export const getStudentById = (req, res) => {
  const { id } = req.params;
  const student = StudentModel.findById(id);

  if (!student) {
    return res.status(404).json({
      status: 'fail',
      message: `Student with ID ${id} not found.`
    });
  }

  res.status(200).json({
    status: 'success',
    data: student
  });
};

// POST /api/students
export const createStudent = (req, res) => {
  const { rollNo, name, email, course, gpa, semester } = req.body;

  // Validation
  if (!rollNo || !name || !email || !course || gpa === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide rollNo, name, email, course, and gpa.'
    });
  }

  // Check unique rollNo
  if (StudentModel.findByRollNo(rollNo)) {
    return res.status(409).json({
      status: 'fail',
      message: `Student with Roll Number '${rollNo}' already exists.`
    });
  }

  const newStudent = StudentModel.create({ rollNo, name, email, course, gpa, semester });

  res.status(201).json({
    status: 'success',
    message: 'Student registered successfully!',
    data: newStudent
  });
};

// PUT /api/students/:id
export const updateStudent = (req, res) => {
  const { id } = req.params;
  const existing = StudentModel.findById(id);

  if (!existing) {
    return res.status(404).json({
      status: 'fail',
      message: `Student with ID ${id} not found.`
    });
  }

  const updated = StudentModel.update(id, req.body);

  res.status(200).json({
    status: 'success',
    message: `Student ID ${id} updated successfully.`,
    data: updated
  });
};

// DELETE /api/students/:id
export const deleteStudent = (req, res) => {
  const { id } = req.params;
  const deleted = StudentModel.delete(id);

  if (!deleted) {
    return res.status(404).json({
      status: 'fail',
      message: `Student with ID ${id} not found.`
    });
  }

  res.status(200).json({
    status: 'success',
    message: `Student '${deleted.name}' (ID: ${id}) removed successfully.`,
    data: deleted
  });
};

// GET /api/students/stats/summary
export const getStudentStats = (req, res) => {
  const stats = StudentModel.getStats();
  res.status(200).json({
    status: 'success',
    data: stats
  });
};
