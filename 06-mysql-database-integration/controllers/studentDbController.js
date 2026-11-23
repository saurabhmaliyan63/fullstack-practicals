// ==============================================================
// Student Database Controller (SQL Queries Execution)
// ==============================================================

import pool from '../config/db.js';

// 1. SELECT all students: SELECT * FROM students
export const getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students ORDER BY id ASC');
    res.status(200).json({
      status: 'success',
      count: rows.length,
      data: rows
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2. SELECT student by ID: SELECT * FROM students WHERE id = ?
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `Student with ID ${id} not found.`
      });
    }

    res.status(200).json({ status: 'success', data: rows[0] });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 3. INSERT new student: INSERT INTO students (...) VALUES (...)
export const createStudent = async (req, res) => {
  try {
    const { roll_no, name, email, department, gpa } = req.body;

    if (!roll_no || !name || !email || !department) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide roll_no, name, email, and department.'
      });
    }

    const insertSql = `
      INSERT INTO students (roll_no, name, email, department, gpa)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(insertSql, [
      roll_no,
      name,
      email,
      department,
      gpa || 0.0
    ]);

    res.status(201).json({
      status: 'success',
      message: 'Student inserted into MySQL database!',
      data: {
        id: result.insertId,
        roll_no,
        name,
        email,
        department,
        gpa
      }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        status: 'fail',
        message: 'Roll number or Email already exists in the database.'
      });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 4. UPDATE student: UPDATE students SET ... WHERE id = ?
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, gpa } = req.body;

    const updateSql = `
      UPDATE students 
      SET name = COALESCE(?, name),
          department = COALESCE(?, department),
          gpa = COALESCE(?, gpa)
      WHERE id = ?
    `;

    const [result] = await pool.query(updateSql, [name, department, gpa, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `Student with ID ${id} not found.`
      });
    }

    // Fetch updated row
    const [updatedRow] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);

    res.status(200).json({
      status: 'success',
      message: `Student ID ${id} updated successfully in MySQL!`,
      data: updatedRow[0]
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5. DELETE student: DELETE FROM students WHERE id = ?
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `Student with ID ${id} not found.`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Student ID ${id} permanently deleted from MySQL database.`
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
