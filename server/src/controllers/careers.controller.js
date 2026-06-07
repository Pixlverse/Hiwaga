const fs = require('fs')
const path = require('path')
const CareerApplication = require('../models/CareerApplication')
const asyncHandler = require('../utils/asyncHandler')

const VALID_STATUSES = ['new', 'reviewed', 'shortlisted', 'rejected']

/**
 * Public endpoint — submit a career application.
 * Expects multipart/form-data with a `resume` file field.
 */
exports.submit = asyncHandler(async (req, res) => {
  const { fullName, email, phone, role, portfolioLinks } = req.body || {}

  if (!fullName || !email || !phone || !role) {
    // Clean up any uploaded file if validation fails
    if (req.file?.path) fs.unlink(req.file.path, () => {})
    return res
      .status(400)
      .json({ message: 'Full name, email, phone and role are required' })
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Resume file is required' })
  }

  const application = await CareerApplication.create({
    fullName,
    email,
    phone,
    role,
    portfolioLinks: portfolioLinks || '',
    resumeUrl: `/uploads/resumes/${req.file.filename}`,
    resumeOriginalName: req.file.originalname,
  })

  res.status(201).json({ data: application })
})

exports.list = asyncHandler(async (req, res) => {
  const { status, search } = req.query
  const filter = {}
  if (status && VALID_STATUSES.includes(status)) filter.status = status
  if (search) {
    const re = new RegExp(search, 'i')
    filter.$or = [
      { fullName: re },
      { email: re },
      { role: re },
    ]
  }
  const apps = await CareerApplication.find(filter).sort({ createdAt: -1 })
  res.json({ data: apps })
})

exports.getOne = asyncHandler(async (req, res) => {
  const app = await CareerApplication.findById(req.params.id)
  if (!app) return res.status(404).json({ message: 'Application not found' })
  res.json({ data: app })
})

exports.updateStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body || {}

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      message: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
    })
  }

  const update = { status }
  if (typeof notes === 'string') update.notes = notes

  const app = await CareerApplication.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true, runValidators: true },
  )
  if (!app) return res.status(404).json({ message: 'Application not found' })

  res.json({ data: app })
})

exports.remove = asyncHandler(async (req, res) => {
  const app = await CareerApplication.findByIdAndDelete(req.params.id)
  if (!app) return res.status(404).json({ message: 'Application not found' })

  // Best-effort delete the uploaded resume from disk
  if (app.resumeUrl) {
    const filePath = path.join(__dirname, '..', '..', app.resumeUrl)
    fs.unlink(filePath, () => {}) // ignore errors
  }

  res.json({ message: 'Deleted', id: req.params.id })
})
