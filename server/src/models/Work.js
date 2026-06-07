const mongoose = require('mongoose')

const WorkSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    title: { type: String, default: 'Untitled', trim: true },
    category: { type: String, default: 'Client Work', trim: true },
    featured: { type: Boolean, default: false },
    reelId: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Work', WorkSchema)
