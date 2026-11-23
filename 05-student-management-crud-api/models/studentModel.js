// ==============================================================
// Student Model / In-Memory Data Store with Helper Operations
// ==============================================================

let students = [
  {
    id: 1,
    rollNo: 'CS101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    course: 'Computer Science',
    gpa: 3.85,
    semester: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    rollNo: 'IT102',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    course: 'Information Technology',
    gpa: 3.92,
    semester: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    rollNo: 'CS103',
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    course: 'Computer Science',
    gpa: 3.45,
    semester: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    rollNo: 'EC104',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    course: 'Electronics',
    gpa: 3.78,
    semester: 5,
    createdAt: new Date().toISOString()
  }
];

export const StudentModel = {
  // Find all students with optional filters
  findAll: ({ course, minGpa }) => {
    let result = [...students];
    if (course) {
      result = result.filter(s => s.course.toLowerCase() === course.toLowerCase());
    }
    if (minGpa) {
      result = result.filter(s => s.gpa >= parseFloat(minGpa));
    }
    return result;
  },

  // Find a student by ID
  findById: (id) => {
    return students.find(s => s.id === parseInt(id, 10));
  },

  // Find student by roll number
  findByRollNo: (rollNo) => {
    return students.find(s => s.rollNo.toUpperCase() === rollNo.toUpperCase());
  },

  // Create new student record
  create: (data) => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = {
      id: newId,
      rollNo: data.rollNo.toUpperCase(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      course: data.course.trim(),
      gpa: parseFloat(data.gpa),
      semester: parseInt(data.semester, 10) || 1,
      createdAt: new Date().toISOString()
    };
    students.push(newStudent);
    return newStudent;
  },

  // Update existing student
  update: (id, updateData) => {
    const index = students.findIndex(s => s.id === parseInt(id, 10));
    if (index === -1) return null;

    students[index] = {
      ...students[index],
      ...updateData,
      id: students[index].id, // Prevent overriding immutable primary key ID
      updatedAt: new Date().toISOString()
    };
    return students[index];
  },

  // Delete student
  delete: (id) => {
    const index = students.findIndex(s => s.id === parseInt(id, 10));
    if (index === -1) return null;
    return students.splice(index, 1)[0];
  },

  // Calculate statistics
  getStats: () => {
    const total = students.length;
    if (total === 0) return { total: 0, averageGpa: 0, courseCounts: {} };

    const averageGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / total).toFixed(2);
    const courseCounts = {};
    students.forEach(s => {
      courseCounts[s.course] = (courseCounts[s.course] || 0) + 1;
    });

    return { total, averageGpa: parseFloat(averageGpa), courseCounts };
  }
};
