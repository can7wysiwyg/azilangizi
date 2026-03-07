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
        enum: ['admin', 'azilangizi'],
        default: 'azilangizi'
    },
    accessToken: {
        type: String,
    
    },
    refreshToken: {
        type: String,
    
    },
    location: {
      type: String,
          },



}, {
    timestamps: true
})


export default mongoose.model('User', UserSchema)