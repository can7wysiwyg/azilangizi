import mongoose from "mongoose";

const Reportchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    rFile: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rType: {
        type: String,
        enum: ['monthly', 'yearly'],
        default: 'monthly'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


}, {
    timestamps: true
})


export default mongoose.model('Report', Reportchema)