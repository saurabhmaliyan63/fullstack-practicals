// ==============================================================
// MySQL Connection Pool Setup using mysql2/promise
// ==============================================================

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool for efficient resource re-use
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'college_db',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to test connectivity
export async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database successfully!');
    connection.release();
    return true;
  } catch (error) {
    console.warn('⚠️ Warning: MySQL Database is not reachable with current credentials.');
    console.warn('   Ensure MySQL is running and check your .env settings.');
    console.warn(`   Reason: ${error.message}`);
    return false;
  }
}

export default pool;
