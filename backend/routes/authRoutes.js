const express = require('express');
const router = express.Router();
const UserAccount = require('../models/UserAccount');
const bcrypt = require('bcryptjs');

// Route to handle user registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserAccount.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new UserAccount({ email, password: hashed });
    await newUser.save();

    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserAccount.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ userId: user._id, email: user.email });
});

module.exports = router;
