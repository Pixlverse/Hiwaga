const express = require('express')

const healthRouter = require('./health')
const authRouter = require('./auth')
const dashboardRouter = require('./dashboard')
const worksRouter = require('./works')
const blogsRouter = require('./blogs')
const careersRouter = require('./careers')
const doohRouter = require('./dooh')
const uploadsRouter = require('./uploads')

const router = express.Router()

router.use('/health', healthRouter)
router.use('/auth', authRouter)
router.use('/dashboard', dashboardRouter)
router.use('/works', worksRouter)
router.use('/blogs', blogsRouter)
router.use('/careers', careersRouter)
router.use('/dooh', doohRouter)
router.use('/uploads', uploadsRouter)

module.exports = router
