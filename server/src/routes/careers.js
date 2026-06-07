const express = require('express')
const ctrl = require('../controllers/careers.controller')
const { authRequired } = require('../middleware/auth')
const { uploadResume } = require('../middleware/upload')

const router = express.Router()

// Public — application submission with resume upload
router.post('/', uploadResume.single('resume'), ctrl.submit)

// Admin
router.get('/', authRequired, ctrl.list)
router.get('/:id', authRequired, ctrl.getOne)
router.patch('/:id/status', authRequired, ctrl.updateStatus)
router.delete('/:id', authRequired, ctrl.remove)

module.exports = router
