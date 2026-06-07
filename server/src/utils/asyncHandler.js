/**
 * Wraps an async route handler so unhandled promise rejections
 * are forwarded to Express's error middleware.
 *
 *   router.get('/foo', asyncHandler(async (req, res) => { ... }))
 */
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler
