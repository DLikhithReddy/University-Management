const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const Blog = require('../models/Blog');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get a specific blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Create a blog with image upload
router.post('/', upload.single('image'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);
  try {
    const { title, sections } = req.body;
    if (!title || !sections || !sections.length) {
      return res.status(400).json({ error: 'Title and sections are required.' });
    }
    const parsedSections = JSON.parse(sections);
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const blog = new Blog({
      title,
      sections: parsedSections,
      imageUrl,
      comments: [],
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error creating blog:', err.message);
    res.status(500).json({ error: 'Failed to create blog', details: err.message });
  }
});

// Add comment to a blog
router.post('/:id/comments', async (req, res) => {
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.comments.push(comment);
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;