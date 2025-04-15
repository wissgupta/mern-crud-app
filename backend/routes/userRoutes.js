const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to get a single user record by ID
router.get('/record/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Route to get all users created by the logged-in user
router.get('/:userId', async (req, res) => {
  try {
    const users = await User.find({ userId: req.params.userId });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route to create a new user entry linked to the logged-in user
router.post('/', async (req, res) => {
  try {
    const { userId, ...userData } = req.body;
    const newUser = new User({ ...userData, userId });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Route to update a user entry
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Route to delete a user entry
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
