const express = require('express')
const ctrl = require('../controllers/blogs.controller')
const { authRequired } = require('../middleware/auth')

const router = express.Router()

// Public
router.get('/', ctrl.list) // supports ?publicOnly=true to scope to published
router.get('/slug/:slug', ctrl.getBySlug)
router.post('/slug/:slug/view', ctrl.incrementViews)

// Admin
router.get('/:id', authRequired, ctrl.getById)
router.post('/', authRequired, ctrl.create)
router.patch('/:id', authRequired, ctrl.update)
router.delete('/:id', authRequired, ctrl.remove)

module.exports = router
