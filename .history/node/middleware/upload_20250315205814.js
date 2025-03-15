// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Images are saved in the uploads folder
  },
  filename: function (req, file, cb) {
    // Use Date.now() and original name to create a unique filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;