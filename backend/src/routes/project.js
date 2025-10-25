const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const projects = await Project.find({ isActive: true })
      .populate('mentor', 'name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: projects.length,
      data: { projects }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('mentor', 'name email')
      .populate('assignedTo.user', 'name email avatar');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: { project }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/projects
// @desc    Create project (Admin/Mentor only)
// @access  Private
router.post('/', protect, authorize('admin', 'mentor'), async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: { project }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;