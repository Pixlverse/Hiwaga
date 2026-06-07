const mongoose = require('mongoose')
const env = require('./env')

async function connectDB() {
  try {
    const conn = await mongoose.connect(env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
