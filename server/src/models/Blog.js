const mongoose = require('mongoose')

const ContentBlockSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['p', 'h2', 'quote'], required: true },
    text: { type: String, required: true },
  },
  { _id: false },
)

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: { type: String, default: '', trim: true },
    cover: { type: String, required: true, trim: true },
    author: {
      name: { type: String, required: true, trim: true },
      initials: { type: String, required: true, trim: true, uppercase: true },
    },
    category: { type: String, required: true, trim: true, index: true },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'published'],
      default: 'draft',
      index: true,
    },
    publishedOn: { type: Date },
    readingTime: { type: String, default: '' },
    content: { type: [ContentBlockSchema], default: [] },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Blog', BlogSchema)
