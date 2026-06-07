const Work = require('../models/Work')
const asyncHandler = require('../utils/asyncHandler')

function extractReelId(url) {
  if (!url) return null
  const match = url.match(/(?:reel|p)\/([^/?]+)/)
  return match ? match[1] : null
}

exports.list = asyncHandler(async (req, res) => {
  const works = await Work.find().sort({ featured: -1, createdAt: -1 })
  res.json({ data: works })
})

exports.create = asyncHandler(async (req, res) => {
  const { url, title, category, featured, order } = req.body || {}
  if (!url) {
    return res.status(400).json({ message: 'Instagram URL is required' })
  }

  const work = await Work.create({
    url,
    title: title || 'Untitled',
    category: category || 'Client Work',
    featured: Boolean(featured),
    order: Number(order) || 0,
    reelId: extractReelId(url),
  })

  res.status(201).json({ data: work })
})

exports.update = asyncHandler(async (req, res) => {
  const update = { ...req.body }
  if (update.url) update.reelId = extractReelId(update.url)

  const work = await Work.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  })
  if (!work) return res.status(404).json({ message: 'Work not found' })

  res.json({ data: work })
})

exports.remove = asyncHandler(async (req, res) => {
  const work = await Work.findByIdAndDelete(req.params.id)
  if (!work) return res.status(404).json({ message: 'Work not found' })
  res.json({ message: 'Deleted', id: req.params.id })
})
