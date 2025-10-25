const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  completionDate: {
    type: Date,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  techStack: [{
    type: String
  }],
  tools: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  duration: {
    type: Number // in weeks
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  mentorName: {
    type: String
  },
  performanceRating: {
    type: Number,
    min: 1,
    max: 5
  },
  qrCode: {
    type: String // base64 or URL
  },
  pdfUrl: {
    type: String
  },
  verificationUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active'
  },
  revokedAt: {
    type: Date
  },
  revokeReason: {
    type: String
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  verificationCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate unique certificate ID
certificateSchema.pre('save', async function(next) {
  if (!this.certificateId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    this.certificateId = `VIEP-${timestamp}-${random}`;
  }
  next();
});

// Generate verification URL
certificateSchema.methods.generateVerificationUrl = function() {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  this.verificationUrl = `${baseUrl}/verify-certificate/${this.certificateId}`;
  return this.verificationUrl;
};

module.exports = mongoose.model('Certificate', certificateSchema);