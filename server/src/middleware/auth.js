const jwt = require('jsonwebtoken')
const env = require('../config/env')

/**
 * Require a valid JWT in the `Authorization: Bearer <token>` header.
 * Attaches the decoded payload to req.user.
 */
function authRequired(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET)
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Invalid or expired token' })
  }
}

module.exports = { authRequired }
