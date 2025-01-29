import mongoose, { Schema, model } from "mongoose";
const messageSchema = new Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        minlength: 5,
        maxlength: 5000,
        trim: true,
        required: true
    }
})

const messageModel = mongoose.models.Message || model('Message', messageSchema)
export default messageModel