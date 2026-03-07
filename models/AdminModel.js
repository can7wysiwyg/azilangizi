import mongoose from 'mongoose'

const AdminSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    
    },
    role: {
        type: String,
        enum: ['basic', 'elevated'],
        default: 'elevated'
    },
    accessToken: {
        type: String,
    
    },
    refreshToken: {
        type: String,
    
    }



}, {
    timestamps: true
})

export default mongoose.model('Admin', AdminSchema)