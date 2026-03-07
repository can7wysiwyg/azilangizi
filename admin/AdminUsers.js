import express from "express"
const AdminUsers = express.Router()
import User from "../models/UserModel.js"
import verify from "../middleware/verify.js"
import adminWare from "../middleware/adminWare.js"

AdminUsers.get('/admin-users', verify, adminWare, async(req, res) => {
    try {
        const users = await User.find({role: "azilangizi"}).sort({_id: -1})

        if(!users || users.length === 0) {
            return res.json({msg: "You have no users"})
        }

        return res.json({users})
        
    } catch (error) {
        console.log(`failure to get users, ${error.message}`)
        return res.json({msg: `failure to get users, ${error.message}`})
    }
})



export default AdminUsers