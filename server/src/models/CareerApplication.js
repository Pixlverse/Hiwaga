const mongoose = require('mongoose')

const CareerApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, index: true },
    resumeUrl: { type: String, required: true },
    resumeOriginalName: { type: String, trim: true },
    portfolioLinks: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'shortlisted', 'rejected'],
      default: 'new',
      index: true,
    },
    notes: { type: String, default: '', trim: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('CareerApplication', CareerApplicationSchema)
