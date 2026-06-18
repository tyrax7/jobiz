const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/cv');
  },
  filename: (req, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    callback(null, uniqueName);
  }
});

function fileFilter(req, file, callback) {
  if (file.mimetype !== 'application/pdf') {
    return callback(new Error('Seuls les fichiers PDF sont autorisés.'));
  }

  callback(null, true);
}

const uploadCv = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = uploadCv;