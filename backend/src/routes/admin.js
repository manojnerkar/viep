const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const User = require('../models/User');
const Project = require('../models/Project');
const { Payment, Plan } = require('../models/Payment');
const Certificate = require('../models/Certificate');

// All routes require admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/stats', async (req, res, next) => {
  try {
    const [userCount, projectCount, paymentCount, certificateCount] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Payment.countDocuments({ status: 'completed' }),
      Certificate.countDocuments({ status: 'active' })
    ]);
    
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: {
        users: userCount,
        projects: projectCount,
        payments: paymentCount,
        certificates: certificateCount,
        revenue: totalRevenue[0]?.total || 0,
        usersByRole
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get('/users', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');
    
    const total = await User.countDocuments();
    
    res.json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: { users }
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private (Admin)
router.put('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin)
router.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/admin/plans
// @desc    Create new plan
// @access  Private (Admin)
router.post('/plans', async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);
    
    res.status(201).json({
      success: true,
      data: { plan }
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/admin/plans/:id
// @desc    Update plan
// @access  Private (Admin)
router.put('/plans/:id', async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.json({
      success: true,
      data: { plan }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/admin/payments
// @desc    Get all payments
// @access  Private (Admin)
router.get('/payments', async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('plan', 'name price')
      .sort('-createdAt')
      .limit(50);
    
    res.json({
      success: true,
      count: payments.length,
      data: { payments }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/admin/certificates/:id/revoke
// @desc    Revoke certificate
// @access  Private (Admin)
router.post('/certificates/:id/revoke', async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    certificate.status = 'revoked';
    certificate.revokedAt = Date.now();
    certificate.revokeReason = req.body.reason || 'Revoked by admin';
    
    await certificate.save();
    
    res.json({
      success: true,
      message: 'Certificate revoked successfully',
      data: { certificate }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;