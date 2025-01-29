import mongoose, { model, Schema } from "mongoose"
const genderTypes = { male: "Male", female: "Female" }
const userSchema = new Schema({
    userName: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    confirmEmailOTP: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordOTP: String,

    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(genderTypes),
        default: genderTypes.male
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    changeTimePassword: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const userModel = mongoose.models.User || model('User', userSchema)
export default userModel