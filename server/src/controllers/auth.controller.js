const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const env = require('../config/env')
const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/User')

// In-memory password-reset token store (cleared on server restart).
// Production: move to Redis or a Mongo collection.
const resetTokens = new Map()

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRY },
  )

  res.json({
    token,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  })
})

exports.me = asyncHandler(async (req, res) => {
  res.json({
    user: {
      email: req.user.email,
      role: req.user.role,
      name: req.user.name || env.ADMIN_NAME,
    },
  })
})

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ message: 'Email is required' })

  // Don't leak whether the email exists. Always respond the same way.
  const user = await User.findOne({ email: email.toLowerCase() })

  // Always respond the same way so we don't leak registered emails.
  if (!user) {
    return res.json({
      message: 'If the email is registered, a reset link has been sent.',
    })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expires = Date.now() + 15 * 60 * 1000 // 15 min
  resetTokens.set(token, { email: user.email, expires })

  // TODO: send via email (SendGrid / Resend / SES).
  const resetUrl = `${env.CORS_ORIGIN}/admin/reset-password?token=${token}`
  console.log('[forgot-password] reset URL:', resetUrl)
  console.log('[forgot-password] token (valid 15 min):', token)

  res.json({
    message: 'If the email is registered, a reset link has been sent.',
  })
})

exports.resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body || {}

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: 'Token and new password are required' })
  }

  const entry = resetTokens.get(token)
  if (!entry || entry.expires < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired token' })
  }

  resetTokens.delete(token)

  const email = entry.email
  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    // Shouldn't happen, but fail gracefully.
    return res.status(400).json({ message: 'Invalid token' })
  }

  const hashed = await bcrypt.hash(newPassword, 10)
  user.password = hashed
  await user.save()

  res.json({ message: 'Password updated successfully.' })
})
