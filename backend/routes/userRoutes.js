const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;