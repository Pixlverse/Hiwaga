const express = require('express')
const ctrl = require('../controllers/works.controller')
const { authRequired } = require('../middleware/auth')

const router = express.Router()

// Public — used by the website's Works page
router.get('/', ctrl.list)

// Admin
router.post('/', authRequired, ctrl.create)
router.patch('/:id', authRequired, ctrl.update)
router.delete('/:id', authRequired, ctrl.remove)

module.exports = router
