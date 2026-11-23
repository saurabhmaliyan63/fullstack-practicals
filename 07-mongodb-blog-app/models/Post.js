// ==============================================================
// Mongoose Schema & Model: Blog Post with Embedded Comments
// ==============================================================

import mongoose from 'mongoose';

// Subdocument schema for comments
const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Comment author name is required'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Comment text cannot be empty'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Main Post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post title is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Title must be at least 3 characters']
    },
    content: {
      type: String,
      required: [true, 'Post content is required']
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Tech', 'Design', 'Life', 'Tutorial'],
      default: 'Tech'
    },
    tags: {
      type: [String],
      default: []
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [commentSchema]
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt
  }
);

// Create compound index for fast search
postSchema.index({ title: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);
export default Post;
