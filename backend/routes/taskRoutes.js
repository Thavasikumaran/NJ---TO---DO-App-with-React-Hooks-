const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Create
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

// Read (all for user)
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

// Update
router.patch('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    res.json(task);
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

module.exports = router;
