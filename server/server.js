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
const User = require('./src/models/User')
const bcrypt = require('bcryptjs')

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
  // Seed an admin user from ENV on first-run if provided (migration helper)
  try {
    if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
      const existing = await User.findOne({
        email: env.ADMIN_EMAIL.toLowerCase(),
      })
      if (!existing) {
        const hashed = await bcrypt.hash(env.ADMIN_PASSWORD, 10)
        await User.create({
          email: env.ADMIN_EMAIL.toLowerCase(),
          name: env.ADMIN_NAME || 'Admin',
          password: hashed,
          role: 'admin',
        })
        console.log('[seed] created admin user from env variables')
      }
    }
  } catch (err) {
    console.error('Error seeding admin user:', err)
  }
  app.listen(env.PORT, () => {
    console.log(
      `Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`,
    )
  })
}

start()
