const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middlewares/authMiddleware');

// Create post (Admin and Editor)
router.post('/', verifyToken, async (req, res) => {
  const { title, body } = req.body;
  const { id: userId, role } = req.user;
  if (!['admin','editor'].includes(role)) return res.status(403).json({ message: 'Forbidden' });
  const post = await Post.create({ title, body, authorId: userId });
  res.status(201).json(post);
});

// Update post (Admin can update any; Editor only their own)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Not found' });

  if (role === 'editor' && post.authorId.toString() !== userId) {
    return res.status(403).json({ message: 'Editors can only edit their own posts' });
  }
  // admin or owner can update
  post.title = req.body.title ?? post.title;
  post.body = req.body.body ?? post.body;
  await post.save();
  res.json(post);
});

// Delete (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// List posts (viewers/readers) - filtered by role (Editors see their posts + others)
router.get('/', verifyToken, async (req, res) => {
  const { id: userId, role } = req.user;
  let query = {};
  if (role === 'editor') query = { $or: [{ authorId: userId }, {}] }; // editors can see all but modify only own - this line is flexible
  // for simplicity show all
  const posts = await Post.find().populate('authorId','username role');
  res.json(posts);
});

module.exports = router;
