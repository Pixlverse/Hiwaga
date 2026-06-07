const Work = require('../models/Work')
const Blog = require('../models/Blog')
const CareerApplication = require('../models/CareerApplication')
const DoohEntry = require('../models/DoohEntry')
const asyncHandler = require('../utils/asyncHandler')

exports.stats = asyncHandler(async (req, res) => {
  const since7d = new Date()
  since7d.setDate(since7d.getDate() - 7)

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const startOfPrevMonth = new Date(startOfMonth)
  startOfPrevMonth.setMonth(startOfPrevMonth.getMonth() - 1)

  const [
    worksTotal,
    works7d,
    blogsTotal,
    blogs7d,
    blogsPublished,
    careersTotal,
    careers7d,
    careersNew,
    doohEntries,
  ] = await Promise.all([
    Work.countDocuments(),
    Work.countDocuments({ createdAt: { $gte: since7d } }),
    Blog.countDocuments(),
    Blog.countDocuments({ createdAt: { $gte: since7d } }),
    Blog.countDocuments({ status: 'published' }),
    CareerApplication.countDocuments(),
    CareerApplication.countDocuments({ createdAt: { $gte: since7d } }),
    CareerApplication.countDocuments({ status: 'new' }),
    DoohEntry.find().lean(),
  ])

  const venueAmount = (e) =>
    (Number(e.totalAmount) * Number(e.sharePct)) / 100

  const totalCollected = doohEntries.reduce(
    (s, e) => s + Number(e.totalAmount),
    0,
  )
  const totalVenueShare = doohEntries.reduce((s, e) => s + venueAmount(e), 0)
  const pendingShare = doohEntries
    .filter((e) => e.status === 'pending')
    .reduce((s, e) => s + venueAmount(e), 0)
  const paidThisMonth = doohEntries
    .filter(
      (e) =>
        e.status === 'paid' &&
        e.paidAt &&
        new Date(e.paidAt) >= startOfMonth,
    )
    .reduce((s, e) => s + venueAmount(e), 0)
  const paidPrevMonth = doohEntries
    .filter(
      (e) =>
        e.status === 'paid' &&
        e.paidAt &&
        new Date(e.paidAt) >= startOfPrevMonth &&
        new Date(e.paidAt) < startOfMonth,
    )
    .reduce((s, e) => s + venueAmount(e), 0)

  // Due in 7 days (pending, checkoutDate within next 7 days)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const in7 = new Date(today)
  in7.setDate(in7.getDate() + 7)
  const dueSoon = doohEntries.filter(
    (e) =>
      e.status === 'pending' &&
      e.checkoutDate &&
      new Date(e.checkoutDate) >= today &&
      new Date(e.checkoutDate) <= in7,
  ).length
  const overdue = doohEntries.filter(
    (e) =>
      e.status === 'pending' &&
      e.checkoutDate &&
      new Date(e.checkoutDate) < today,
  ).length

  res.json({
    works: { total: worksTotal, last7d: works7d },
    blogs: {
      total: blogsTotal,
      last7d: blogs7d,
      published: blogsPublished,
    },
    careers: {
      total: careersTotal,
      last7d: careers7d,
      new: careersNew,
    },
    dooh: {
      entries: doohEntries.length,
      activeVenues: new Set(doohEntries.map((e) => e.place)).size,
      totalCollected,
      totalVenueShare,
      pendingShare,
      paidThisMonth,
      paidPrevMonth,
      monthOverMonthPct:
        paidPrevMonth > 0
          ? ((paidThisMonth - paidPrevMonth) / paidPrevMonth) * 100
          : null,
      dueSoon,
      overdue,
    },
  })
})

exports.recentActivity = asyncHandler(async (req, res) => {
  const [latestCareer, latestBlog, latestWork, latestDooh] = await Promise.all(
    [
      CareerApplication.find().sort({ createdAt: -1 }).limit(3).lean(),
      Blog.find().sort({ createdAt: -1 }).limit(3).lean(),
      Work.find().sort({ createdAt: -1 }).limit(3).lean(),
      DoohEntry.find().sort({ createdAt: -1 }).limit(3).lean(),
    ],
  )

  const items = []

  latestCareer.forEach((a) => {
    items.push({
      type: 'career',
      text: `New application from ${a.fullName} — ${a.role}`,
      at: a.createdAt,
    })
  })
  latestBlog.forEach((b) => {
    items.push({
      type: 'blog',
      text: `Blog “${b.title}” ${b.status === 'published' ? 'published' : 'saved as ' + b.status}`,
      at: b.createdAt,
    })
  })
  latestWork.forEach((w) => {
    items.push({
      type: 'work',
      text: `Reel “${w.title}” added to Works`,
      at: w.createdAt,
    })
  })
  latestDooh.forEach((d) => {
    items.push({
      type: 'dooh',
      text: `DOOH entry added — ${d.ad} @ ${d.place}`,
      at: d.createdAt,
    })
  })

  items.sort((a, b) => new Date(b.at) - new Date(a.at))
  res.json({ data: items.slice(0, 10) })
})
