// ==============================================================
// MongoDB Blog API Routes
// ==============================================================

import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost
} from '../controllers/postController.js';

const router = express.Router();

router.route('/')
  .get(getAllPosts)
  .post(createPost);

router.route('/:id')
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

// Comments subdocument endpoint
router.post('/:id/comments', addComment);

// Likes endpoint
router.patch('/:id/like', likePost);

export default router;
