const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');

// Create a new course
router.post('/', async (req, res) => {
  try {
    const { course_code, courses, year, sem, credits, course_description, pname, plink } = req.body;
    const newCourse = new Course({ course_code, courses, year, sem, credits, course_description, pname, plink });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update a course by course code
router.put('/:course_code', async (req, res) => {
  try {
    const { course_code } = req.params;
    const { courses, year, sem, credits, course_description, pname, plink } = req.body;
    const updatedCourse = await Course.findOneAndUpdate(
      { course_code },
      { courses, year, sem, credits, course_description, pname, plink },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete a course by course code
router.delete('/:course_code', async (req, res) => {
  try {
    const { course_code } = req.params;
    await Course.findOneAndDelete({ course_code });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

module.exports = router;
