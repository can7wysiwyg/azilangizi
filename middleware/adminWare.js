import User from '../models/UserModel.js'

const adminWare = async(req, res, next) => {

    try {

        const user = await User.findOne({_id: req.user._id})

    

        if(user.role !== "admin" ) {

         return res.json({msg: "You are not authorized to perform this action"})
        } 
           next();
        
    } catch (error) {
        console.log("There was an error in verifying admin", error.message)
        res.json({msg: "Error verifying admin", error: error.message})
    }
}

export default  adminWare