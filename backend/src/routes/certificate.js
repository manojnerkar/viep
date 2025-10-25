const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const Certificate = require('../models/Certificate');

// @route   GET /api/certificates/my-certificates
// @desc    Get user certificates
// @access  Private
router.get('/my-certificates', protect, async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ 
      user: req.user.id,
      status: 'active'
    })
    .populate('project', 'title')
    .populate('mentor', 'name')
    .sort('-createdAt');
    
    res.json({
      success: true,
      count: certificates.length,
      data: { certificates }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/certificates/:id
// @desc    Get single certificate
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('project', 'title')
      .populate('user', 'name email')
      .populate('mentor', 'name');
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.json({
      success: true,
      data: { certificate }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/certificates/verify/:certificateId
// @desc    Verify certificate by certificate ID
// @access  Public
router.get('/verify/:certificateId', async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.certificateId,
      status: 'active'
    })
    .populate('user', 'name email')
    .populate('project', 'title')
    .populate('mentor', 'name');
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found or has been revoked'
      });
    }
    
    // Increment verification count
    certificate.verificationCount += 1;
    await certificate.save();
    
    res.json({
      success: true,
      message: 'Certificate is valid',
      data: { certificate }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/certificates/download/:id
// @desc    Download certificate
// @access  Private
router.post('/download/:id', protect, async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    if (certificate.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to download this certificate'
      });
    }
    
    // Increment download count
    certificate.downloadCount += 1;
    await certificate.save();
    
    res.json({
      success: true,
      data: { 
        pdfUrl: certificate.pdfUrl,
        certificateId: certificate.certificateId
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;