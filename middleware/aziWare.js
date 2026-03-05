import User from '../models/UserModel.js'

 const aziWare = async(req, res, next) => {

    try {

        const user = await User.findOne({_id: req.user._id})

    

        if(user.role !== "azilangizi" ) {

         return res.json({msg: "You are not authorized to perform this action"})
        } 
           next();
        
    } catch (error) {
        console.log("Error, figuring out your role", error.message)
        res.json({msg: `Error verifying creator, error: ${error.message}`})
    }
}


export default aziWare