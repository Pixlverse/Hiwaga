const express = require('express')
const ctrl = require('../controllers/dashboard.controller')
const { authRequired } = require('../middleware/auth')

const router = express.Router()

router.use(authRequired)

router.get('/stats', ctrl.stats)
router.get('/activity', ctrl.recentActivity)

module.exports = router
