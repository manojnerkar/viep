const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { Subscription } = require('../models/Payment');

// @route   GET /api/subscriptions/status
// @desc    Get user subscription status
// @access  Private
router.get('/status', protect, async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active',
      endDate: { $gte: new Date() }
    }).populate('plan').populate('payment');
    
    res.json({
      success: true,
      data: { subscription }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/subscriptions/my-subscriptions
// @desc    Get all user subscriptions
// @access  Private
router.get('/my-subscriptions', protect, async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id })
      .populate('plan')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: subscriptions.length,
      data: { subscriptions }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/subscriptions/:id/cancel
// @desc    Cancel subscription
// @access  Private
router.post('/:id/cancel', protect, async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    if (subscription.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this subscription'
      });
    }
    
    subscription.status = 'cancelled';
    subscription.cancelledAt = Date.now();
    subscription.cancelReason = req.body.reason || 'User requested cancellation';
    
    await subscription.save();
    
    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      data: { subscription }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;