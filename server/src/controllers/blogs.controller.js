const Blog = require('../models/Blog')
const asyncHandler = require('../utils/asyncHandler')

function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function initialsOf(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
}

exports.list = asyncHandler(async (req, res) => {
  const { status, category, search, publicOnly } = req.query
  const filter = {}
  if (status) filter.status = status
  if (category) filter.category = category
  if (publicOnly === 'true') filter.status = 'published'
  if (search) {
    const re = new RegExp(search, 'i')
    filter.$or = [
      { title: re },
      { excerpt: re },
      { 'author.name': re },
    ]
  }

  const blogs = await Blog.find(filter).sort({ createdAt: -1 })
  res.json({ data: blogs })
})

exports.getBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
  if (!blog) return res.status(404).json({ message: 'Blog not found' })
  res.json({ data: blog })
})

exports.getById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).json({ message: 'Blog not found' })
  res.json({ data: blog })
})

exports.create = asyncHandler(async (req, res) => {
  const body = { ...req.body }

  if (!body.title || !body.cover || !body.category) {
    return res
      .status(400)
      .json({ message: 'title, cover, and category are required' })
  }

  // Auto-fill slug and author initials when missing
  if (!body.slug) body.slug = slugify(body.title)
  if (body.author && !body.author.initials) {
    body.author.initials = initialsOf(body.author.name)
  }

  // Ensure publishedOn is set when publishing
  if (body.status === 'published' && !body.publishedOn) {
    body.publishedOn = new Date()
  }

  const existing = await Blog.findOne({ slug: body.slug })
  if (existing) {
    return res
      .status(409)
      .json({ message: 'A blog with this slug already exists' })
  }

  const blog = await Blog.create(body)
  res.status(201).json({ data: blog })
})

exports.update = asyncHandler(async (req, res) => {
  const update = { ...req.body }
  if (update.title && !update.slug) update.slug = slugify(update.title)
  if (update.author && !update.author.initials) {
    update.author.initials = initialsOf(update.author.name)
  }

  if (update.status === 'published' && !update.publishedOn) {
    update.publishedOn = new Date()
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  })
  if (!blog) return res.status(404).json({ message: 'Blog not found' })

  res.json({ data: blog })
})

exports.remove = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  if (!blog) return res.status(404).json({ message: 'Blog not found' })
  res.json({ message: 'Deleted', id: req.params.id })
})

exports.incrementViews = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true },
  )
  if (!blog) return res.status(404).json({ message: 'Blog not found' })
  res.json({ data: { views: blog.views } })
})
