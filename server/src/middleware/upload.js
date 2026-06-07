const path = require('path')
const fs = require('fs')
const multer = require('multer')
const env = require('../config/env')

const ROOT = path.join(__dirname, '..', '..')
const resumeDir = path.join(ROOT, env.UPLOAD_DIR, 'resumes')
const imageDir = path.join(ROOT, env.UPLOAD_DIR, 'images')

for (const dir of [resumeDir, imageDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function namedStorage(dir) {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase()
      const stamp = Date.now()
      const rand = Math.random().toString(36).slice(2, 8)
      cb(null, `${stamp}-${rand}${ext}`)
    },
  })
}

const resumeFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (!['.pdf', '.doc', '.docx'].includes(ext)) {
    return cb(new Error('Only PDF, DOC, or DOCX files are allowed'))
  }
  cb(null, true)
}

const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'].includes(ext)) {
    return cb(new Error('Only JPG, PNG, WEBP, GIF, or AVIF images are allowed'))
  }
  cb(null, true)
}

const uploadResume = multer({
  storage: namedStorage(resumeDir),
  fileFilter: resumeFilter,
  limits: { fileSize: env.MAX_FILE_SIZE },
})

const uploadImage = multer({
  storage: namedStorage(imageDir),
  fileFilter: imageFilter,
  limits: { fileSize: env.MAX_FILE_SIZE },
})

module.exports = { uploadResume, uploadImage, resumeDir, imageDir }
