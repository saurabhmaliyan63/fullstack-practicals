# Practical 6: Database Integration – Express.js + MySQL

## Aim
Connect an Express REST API backend to a MySQL relational database, manage connection pooling with `mysql2`, and execute parameterized SQL queries for CRUD operations.

## Concepts Demonstrated
1. **Connection Pooling**:
   - `mysql.createPool()` for non-blocking concurrent client handling.
   - Reusing open database connections rather than creating a new TCP connection per request.
2. **SQL Prepared Statements**:
   - Using `?` placeholders (e.g. `SELECT * FROM students WHERE id = ?`) to eliminate SQL Injection vulnerabilities.
3. **Relational Database Design**:
   - Primary Keys (`AUTO_INCREMENT`), Unique constraints (`roll_no`, `email`), `TIMESTAMP` audit columns.
4. **Environment Variables**:
   - Storing DB credentials securely in `.env`.

## Project Structure
```
06-mysql-database-integration/
├── package.json                   # Dependencies: express, mysql2, dotenv, cors
├── .env.example                   # Environment configuration template
├── schema.sql                     # SQL script to create database, table & seeds
├── config/
│   └── db.js                      # MySQL connection pool initialization
├── controllers/
│   └── studentDbController.js     # SQL query logic (SELECT, INSERT, UPDATE, DELETE)
├── routes/
│   └── studentRoutes.js           # REST API endpoints
├── server.js                      # Express application entry point
└── README.md                      # Documentation & setup guide
```

## How to Set Up & Run

### Step 1: Set up MySQL Database
1. Open MySQL Workbench or your terminal and execute `schema.sql`:
   ```bash
   mysql -u root -p < schema.sql
   ```
2. Verify that the `college_db` database and `students` table are created.

### Step 2: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your MySQL password:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_password
   DB_NAME=college_db
   PORT=5002
   ```

### Step 3: Install & Start Server
```bash
cd "06-mysql-database-integration"
npm install
npm start
```

## Sample API Requests

- **Fetch All MySQL Students**:
  ```bash
  curl http://localhost:5002/api/mysql-students
  ```
- **Insert a New Student**:
  ```bash
  curl -X POST http://localhost:5002/api/mysql-students \
    -H "Content-Type: application/json" \
    -d "{\"roll_no\":\"CS205\",\"name\":\"Devika Sen\",\"email\":\"devika@example.com\",\"department\":\"Computer Engineering\",\"gpa\":3.88}"
  ```
- **Update Student**:
  ```bash
  curl -X PUT http://localhost:5002/api/mysql-students/1 \
    -H "Content-Type: application/json" \
    -d "{\"gpa\":3.95}"
  ```
- **Delete Student**:
  ```bash
  curl -X DELETE http://localhost:5002/api/mysql-students/2
  ```
