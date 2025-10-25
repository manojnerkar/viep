const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  type: {
    type: String,
    enum: ['dummy', 'real-client'],
    default: 'dummy'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  techStack: [{
    type: String,
    required: true
  }],
  tools: [{
    type: String // GitHub, Jira, Figma, Postman, etc.
  }],
  duration: {
    type: Number, // in weeks
    required: true
  },
  sprints: [{
    sprintNumber: Number,
    title: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started'
    }
  }],
  assignedTo: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['assigned', 'in-progress', 'under-review', 'completed'],
      default: 'assigned'
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    startDate: Date,
    completionDate: Date
  }],
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  githubRepo: {
    type: String
  },
  liveUrl: {
    type: String
  },
  resources: [{
    title: String,
    url: String,
    type: String // video, document, link
  }],
  requirements: [{
    type: String
  }],
  learningOutcomes: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  maxParticipants: {
    type: Number,
    default: 50
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for searching
projectSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Project', projectSchema);