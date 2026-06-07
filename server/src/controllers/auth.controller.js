const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const env = require('../config/env')
const asyncHandler = require('../utils/asyncHandler')

// In-memory password-reset token store (cleared on server restart).
// Production: move to Redis or a Mongo collection.
const resetTokens = new Map()

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  if (
    email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase() ||
    password !== env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { sub: 'admin', email: env.ADMIN_EMAIL, role: 'admin' },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRY },
  )

  res.json({
    token,
    user: {
      email: env.ADMIN_EMAIL,
      name: env.ADMIN_NAME,
      role: 'admin',
    },
  })
})

exports.me = asyncHandler(async (req, res) => {
  res.json({
    user: {
      email: req.user.email,
      role: req.user.role,
      name: env.ADMIN_NAME,
    },
  })
})

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ message: 'Email is required' })

  // Don't leak whether the email exists. Always respond the same way.
  if (email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) {
    return res.json({
      message: 'If the email is registered, a reset link has been sent.',
    })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expires = Date.now() + 15 * 60 * 1000 // 15 min
  resetTokens.set(token, { email, expires })

  // TODO: send via email (SendGrid / Resend / SES).
  // For now, log it server-side so the admin can copy it during dev.
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

  // Password is currently env-based, so we can't persist a new value.
  // Acknowledge token validation and instruct the admin to update .env.
  res.json({
    message:
      'Token verified. Update ADMIN_PASSWORD in your server .env and restart the API.',
    note: 'Server-side password is env-based for now. Migrate to a Users collection to support in-app password changes.',
  })
})
