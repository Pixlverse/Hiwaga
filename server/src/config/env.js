require('dotenv').config()

const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI:
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hiwaga',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:7040',

  // Admin auth (env-based for now)
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@hiwagamakers.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  ADMIN_NAME: process.env.ADMIN_NAME || 'Hiwaga Admin',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'dev-only-secret-change-me',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',

  // Uploads
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5 MB
}

module.exports = env
