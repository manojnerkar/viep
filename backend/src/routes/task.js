const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const Task = require('../models/Task');

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('project', 'title')
      .populate('assignedBy', 'name')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: tasks.length,
      data: { tasks }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'title')
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email');
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/tasks/:id/status
// @desc    Update task status
// @access  Private
router.put('/:id/status', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    task.status = req.body.status;
    if (req.body.status === 'completed') {
      task.completedAt = Date.now();
    }
    
    await task.save();
    
    res.json({
      success: true,
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/tasks/:id/submit
// @desc    Submit task
// @access  Private
router.post('/:id/submit', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    task.submission = {
      githubPR: req.body.githubPR,
      liveUrl: req.body.liveUrl,
      notes: req.body.notes,
      submittedAt: Date.now()
    };
    task.status = 'under-review';
    
    await task.save();
    
    res.json({
      success: true,
      message: 'Task submitted successfully',
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;