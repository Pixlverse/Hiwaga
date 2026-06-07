const DoohEntry = require('../models/DoohEntry')
const asyncHandler = require('../utils/asyncHandler')

exports.list = asyncHandler(async (req, res) => {
  const { status, search, place, from, to } = req.query
  const filter = {}
  if (status) filter.status = status
  if (place) filter.place = place
  if (search) {
    const re = new RegExp(search, 'i')
    filter.$or = [{ place: re }, { ad: re }, { placeType: re }]
  }
  if (from || to) {
    filter.date = {}
    if (from) filter.date.$gte = new Date(from)
    if (to) filter.date.$lte = new Date(to)
  }

  const entries = await DoohEntry.find(filter).sort({ checkoutDate: 1 })
  res.json({ data: entries })
})

exports.getOne = asyncHandler(async (req, res) => {
  const entry = await DoohEntry.findById(req.params.id)
  if (!entry) return res.status(404).json({ message: 'Entry not found' })
  res.json({ data: entry })
})

exports.create = asyncHandler(async (req, res) => {
  const required = [
    'place',
    'ad',
    'date',
    'paymentFrequency',
    'checkoutDate',
    'totalAmount',
    'sharePct',
  ]
  for (const k of required) {
    if (
      req.body[k] === undefined ||
      req.body[k] === null ||
      req.body[k] === ''
    ) {
      return res.status(400).json({ message: `${k} is required` })
    }
  }

  const entry = await DoohEntry.create(req.body)
  res.status(201).json({ data: entry })
})

exports.update = asyncHandler(async (req, res) => {
  const update = { ...req.body }
  if (update.status === 'paid' && !update.paidAt) {
    update.paidAt = new Date()
  }

  const entry = await DoohEntry.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  })
  if (!entry) return res.status(404).json({ message: 'Entry not found' })

  res.json({ data: entry })
})

exports.toggleStatus = asyncHandler(async (req, res) => {
  const entry = await DoohEntry.findById(req.params.id)
  if (!entry) return res.status(404).json({ message: 'Entry not found' })

  entry.status = entry.status === 'paid' ? 'pending' : 'paid'
  entry.paidAt = entry.status === 'paid' ? new Date() : undefined
  await entry.save()

  res.json({ data: entry })
})

exports.remove = asyncHandler(async (req, res) => {
  const entry = await DoohEntry.findByIdAndDelete(req.params.id)
  if (!entry) return res.status(404).json({ message: 'Entry not found' })
  res.json({ message: 'Deleted', id: req.params.id })
})
