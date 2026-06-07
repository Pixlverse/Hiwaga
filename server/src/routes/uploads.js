const express = require('express')
const { authRequired } = require('../middleware/auth')
const { uploadImage } = require('../middleware/upload')

const router = express.Router()

router.post(
  '/image',
  authRequired,
  uploadImage.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' })
    }
    res.status(201).json({
      url: `/uploads/images/${req.file.filename}`,
      originalName: req.file.originalname,
      size: req.file.size,
    })
  },
)

module.exports = router
