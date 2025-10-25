const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { Plan, Payment } = require('../models/Payment');

// @route   GET /api/payments/plans
// @desc    Get all active plans
// @access  Public
router.get('/plans', async (req, res, next) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort('displayOrder');
    
    res.json({
      success: true,
      count: plans.length,
      data: { plans }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/payments/plans/:id
// @desc    Get single plan
// @access  Public
router.get('/plans/:id', async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    
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

// @route   POST /api/payments/checkout
// @desc    Create payment order
// @access  Private
router.post('/checkout', protect, async (req, res, next) => {
  try {
    const { planId } = req.body;
    
    const plan = await Plan.findById(planId);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    // Create payment record
    const payment = await Payment.create({
      user: req.user.id,
      plan: planId,
      amount: plan.price,
      status: 'pending'
    });
    
    // TODO: Integrate Razorpay/Stripe here
    
    res.json({
      success: true,
      message: 'Payment initiated',
      data: { 
        payment,
        amount: plan.price,
        currency: 'INR'
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/payments/verify
// @desc    Verify payment
// @access  Private
router.post('/verify', protect, async (req, res, next) => {
  try {
    const { paymentId, razorpayPaymentId, razorpaySignature } = req.body;
    
    // TODO: Verify Razorpay signature
    
    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    
    payment.status = 'completed';
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.paidAt = Date.now();
    
    await payment.save();
    
    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: { payment }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/payments/my-payments
// @desc    Get user payment history
// @access  Private
router.get('/my-payments', protect, async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate('plan', 'name price')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: payments.length,
      data: { payments }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;