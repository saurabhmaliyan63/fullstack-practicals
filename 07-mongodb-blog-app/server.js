// ==============================================================
// Practical 7: MongoDB Blog Application Server
// ==============================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// API Info endpoint
app.get('/', (req, res) => {
  res.json({
    project: 'MongoDB NoSQL Blog Application with Mongoose',
    endpoints: {
      getAllPosts: 'GET /api/posts',
      filterByTag: 'GET /api/posts?tag=react',
      searchKeywords: 'GET /api/posts?search=database',
      getSinglePost: 'GET /api/posts/:id',
      createPost: 'POST /api/posts',
      updatePost: 'PUT /api/posts/:id',
      deletePost: 'DELETE /api/posts/:id',
      addComment: 'POST /api/posts/:id/comments',
      likePost: 'PATCH /api/posts/:id/like'
    }
  });
});

// Mount Routes
app.use('/api/posts', postRoutes);

// Start Server & Connect MongoDB
app.listen(PORT, async () => {
  console.log(`📝 Blog Application server running on: http://localhost:${PORT}`);
  await connectMongoDB();
});
