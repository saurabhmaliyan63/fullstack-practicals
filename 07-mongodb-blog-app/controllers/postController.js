// ==============================================================
// Blog Post Controller: CRUD + Comments + Likes
// ==============================================================

import Post from '../models/Post.js';

// 1. GET all posts with optional filtering by tag or keyword
export const getAllPosts = async (req, res) => {
  try {
    const { tag, category, search } = req.query;
    const filter = {};

    if (tag) filter.tags = tag;
    if (category) filter.category = category;
    if (search) {
      filter.$text = { $search: search };
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2. GET single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'No blog post found with this ID'
      });
    }

    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid Post ID' });
  }
};

// 3. CREATE a new blog post
export const createPost = async (req, res) => {
  try {
    const { title, content, author, category, tags } = req.body;

    const newPost = await Post.create({
      title,
      content,
      author,
      category,
      tags
    });

    res.status(201).json({
      status: 'success',
      message: 'Blog post created successfully!',
      data: newPost
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// 4. UPDATE a post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated doc & run schema validations
    );

    if (!updatedPost) {
      return res.status(404).json({
        status: 'fail',
        message: 'No blog post found with this ID'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// 5. DELETE a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'No blog post found with this ID'
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Blog post "${post.title}" deleted successfully.`
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// 6. ADD a comment sub-document to a post
export const addComment = async (req, res) => {
  try {
    const { author, text } = req.body;

    if (!author || !text) {
      return res.status(400).json({
        status: 'fail',
        message: 'Author and text are required for comment.'
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ status: 'fail', message: 'Post not found' });
    }

    post.comments.push({ author, text });
    await post.save();

    res.status(201).json({
      status: 'success',
      message: 'Comment added successfully',
      data: post.comments
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// 7. INCREMENT like count
export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ status: 'fail', message: 'Post not found' });
    }

    res.status(200).json({
      status: 'success',
      likes: post.likes
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
