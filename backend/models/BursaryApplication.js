// backend/models/BursaryApplication.js
import mongoose from 'mongoose';

const BursaryApplicationSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  
  // Parent/Guardian Information
  parentFirstName: {
    type: String,
    required: true,
    trim: true
  },
  parentLastName: {
    type: String,
    required: true,
    trim: true
  },
  parentPhoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  parentEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  
  // Educational Information
  currentSchool: {
    type: String,
    required: true,
    trim: true
  },
  schoolAddress: {
    type: String,
    required: true,
    trim: true
  },
  currentGrade: {
    type: String,
    required: true,
    trim: true
  },
  expectedGraduation: {
    type: String,
    required: true,
    trim: true
  },
  gpa: {
    type: String,
    required: true,
    trim: true
  },
  extracurricular: {
    type: String,
    required: true
  },
  
  // Personal Statement
  whyNeedBursary: {
    type: String,
    required: true
  },
  futureGoals: {
    type: String,
    required: true
  },
  
  // Document References (Sanity IDs)
  documents: [{
    type: String,
    required: true
  }],
  
  // Status Information
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewNotes: {
    type: String,
    default: ''
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  },
  
  // Signatures
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  parentSignature: {
    type: String,
    required: true,
    trim: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.BursaryApplication || mongoose.model('BursaryApplication', BursaryApplicationSchema);