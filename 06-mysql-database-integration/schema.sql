-- ==========================================================
-- Practical 6: MySQL Database Schema Setup
-- Run this script in MySQL Workbench or via MySQL CLI:
-- mysql -u root -p < schema.sql
-- ==========================================================

-- 1. Create Database if not exists
CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

-- 2. Create Students Table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_no VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  department VARCHAR(50) NOT NULL,
  gpa DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Insert Initial Mock Data
INSERT INTO students (roll_no, name, email, department, gpa) VALUES
('CS201', 'Arjun Kapoor', 'arjun.k@example.com', 'Computer Engineering', 3.82),
('IT202', 'Sneha Desai', 'sneha.d@example.com', 'Information Technology', 3.91),
('ME203', 'Vikram Singh', 'vikram.s@example.com', 'Mechanical Engineering', 3.40),
('EE204', 'Meera Nair', 'meera.n@example.com', 'Electrical Engineering', 3.75)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 4. Verify insertion
SELECT * FROM students;
