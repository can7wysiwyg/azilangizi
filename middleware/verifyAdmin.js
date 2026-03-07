import jwt from 'jsonwebtoken'
import { decryptId } from './cryptic.';
import Admin from '../models/AdminModel.js'

const verifyAdmin = async (req, res, next) => {
  try {
  
    if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {

const key = req.headers.authorization.split(' ')[1]

const decryptedKey = decryptId(key)



    const admin = await Admin.findById(decryptedKey); 
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
   
    const adminId = admin._id.toString();
    const acesstoken = admin.accessToken;
    
    const isValidKey = adminId === decryptedKey


    
    if (!isValidKey || !acesstoken) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

   
    const decoded = jwt.verify(acesstoken, process.env.ADMIN_ACCESS_TOKEN);
    if (decoded.id !== adminId) {
      return res.status(401).json({ msg: "Token  mismatch" });
    }

    
    req.admin = await Admin.findById(decoded.id).select('-password -refreshToken -accessToken');
          
    next();
  }

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: "Access token expired" });
    }

    console.error("Middleware error:", error.message);
    return res.status(500).json({ msg: "Middleware server error", error: error.message });
  }
};




export default verifyAdmin 
