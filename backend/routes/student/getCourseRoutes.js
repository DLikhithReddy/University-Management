const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');

router.get('/', async (req, res) => {
  const { year, sem } = req.query;
  try {
    const courses = await Course.find({ year: parseInt(year), sem: parseInt(sem) });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

module.exports = router;