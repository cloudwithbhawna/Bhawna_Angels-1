const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ",'')
    if(!token)
        return res.status(401).json({message:"Access denied. no token provided"})

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    }catch(error){
        res.status(400).json({message:"Invalid Token"})
    }
}

module.exports = authMiddleware


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