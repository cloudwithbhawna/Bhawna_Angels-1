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