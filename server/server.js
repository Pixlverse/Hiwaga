const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')

const env = require('./src/config/env')
const connectDB = require('./src/config/db')
const apiRoutes = require('./src/routes')
const { notFound, errorHandler } = require('./src/middleware/errorHandler')

const app = express()

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)

// CORS — accept a comma-separated list of origins from env
const allowedOrigins = env.CORS_ORIGIN
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow same-origin / curl / server-to-server (no Origin header)
      if (!origin) return cb(null, true)
      if (allowedOrigins.includes(origin)) return cb(null, true)
      return cb(new Error(`Origin ${origin} not allowed by CORS`))
    },
    credentials: true,
  }),
)

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))

if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

// Static — serve uploaded resumes etc.
app.use(
  '/uploads',
  express.static(path.join(__dirname, env.UPLOAD_DIR)),
)

app.use('/api', apiRoutes)

// 404 + error handling
app.use(notFound)

// Multer error handler — surface upload errors as JSON
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: err.message, code: err.code })
  }
  if (err && err.message && err.message.startsWith('Only')) {
    // File-type rejection from our fileFilter
    return res.status(400).json({ message: err.message })
  }
  next(err)
})

app.use(errorHandler)

async function start() {
  await connectDB()
  app.listen(env.PORT, () => {
    console.log(
      `Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`,
    )
  })
}

start()
