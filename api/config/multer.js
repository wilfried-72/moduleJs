const multer = require('multer')

// Ici nous définissons la config de stockage de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  // Ici on stock le nom de l'image dans le filename
  filename: (req, file, cb) => {
    const ext = file.originalname,
      date = Date.now()
    cb(null, ext)
  },
})

const uploadArray = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 4098 * 4098,
    files: 10
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      cb(new Error('Le fichier doit être au format png, jpg, jpeg ou gif.'))
    }
  }
})
module.exports = uploadArray
