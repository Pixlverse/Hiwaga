const express = require('express')
const ctrl = require('../controllers/dooh.controller')
const { authRequired } = require('../middleware/auth')

const router = express.Router()

// All DOOH endpoints are admin-only
router.use(authRequired)

router.get('/', ctrl.list)
router.get('/:id', ctrl.getOne)
router.post('/', ctrl.create)
router.patch('/:id', ctrl.update)
router.post('/:id/toggle-status', ctrl.toggleStatus)
router.delete('/:id', ctrl.remove)

module.exports = router
