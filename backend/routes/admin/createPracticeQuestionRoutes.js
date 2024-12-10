const express = require('express');
const router = express.Router();
const PracticeQuestion = require('../../models/PracticeQuestion');

// Create a practice question
router.post('/', async (req, res) => {
  const { question, topic, company, link } = req.body;

  if (!question || !topic || !company || !link) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newQuestion = new PracticeQuestion({ question, topic, company, link });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add practice question' });
  }
});

module.exports = router;
