import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
     name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'azilangizi'],
        default: 'user'
    },
    accessToken: {
        type: String,
    
    },
    refreshToken: {
        type: String,
    
    },


}, {
    timestamps: true
})


export default mongoose.model('User', UserSchema)