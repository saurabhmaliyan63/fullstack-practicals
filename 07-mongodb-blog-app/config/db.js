// ==============================================================
// MongoDB Connection via Mongoose ODM
// ==============================================================

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectMongoDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`🍃 Connected to MongoDB: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn('⚠️ Warning: Could not connect to MongoDB server.');
    console.warn(`   Check MONGODB_URI in your .env file or start MongoDB service.`);
    console.warn(`   Error: ${error.message}`);
  }
}
