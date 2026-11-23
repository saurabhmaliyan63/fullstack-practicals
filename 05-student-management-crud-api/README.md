# Practical 5: Student Management System REST API

## Aim
Develop a modular RESTful API for a Student Management System supporting full CRUD (Create, Read, Update, Delete) operations, querying, and filtering using Express.js.

## Key Features
- **MVC Architecture**: Clear separation of concerns with Models, Controllers, and Routes.
- **RESTful Endpoints & HTTP Status Codes**:
  - `200 OK`: Successful retrieval or update.
  - `201 Created`: Student successfully created.
  - `400 Bad Request`: Missing or invalid input payload.
  - `404 Not Found`: Student record does not exist.
  - `409 Conflict`: Duplicate roll number detected.
- **Filtering & Analytics**:
  - Filter students by course (`?course=Computer%20Science`).
  - Filter students by minimum GPA (`?minGpa=3.5`).
  - Aggregate statistics endpoint (`/api/students/stats/summary`).

## Project Structure
```
05-student-management-crud-api/
├── package.json               # Project manifest
├── server.js                   # Application entry & middleware
├── models/
│   └── studentModel.js        # Data store & queries
├── controllers/
│   └── studentController.js   # HTTP request/response handlers
├── routes/
│   └── studentRoutes.js       # Route definitions
└── README.md                  # Documentation & testing examples
```

## How to Run

1. Open a terminal in this folder:
   ```bash
   cd "05-student-management-crud-api"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Access `http://localhost:5001/api/students`

## Sample API Requests (curl / Postman)

### 1. Get All Students
```bash
curl http://localhost:5001/api/students
```

### 2. Filter Students
```bash
curl "http://localhost:5001/api/students?course=Computer%20Science&minGpa=3.5"
```

### 3. Get Student by ID
```bash
curl http://localhost:5001/api/students/1
```

### 4. Create New Student (POST)
```bash
curl -X POST http://localhost:5001/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "rollNo": "CS105",
    "name": "Kavya Nair",
    "email": "kavya.nair@example.com",
    "course": "Computer Science",
    "gpa": 3.95,
    "semester": 4
  }'
```

### 5. Update Student (PUT)
```bash
curl -X PUT http://localhost:5001/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "gpa": 3.90,
    "semester": 5
  }'
```

### 6. Delete Student (DELETE)
```bash
curl -X DELETE http://localhost:5001/api/students/3
```

### 7. Student Statistics Summary
```bash
curl http://localhost:5001/api/students/stats/summary
```
