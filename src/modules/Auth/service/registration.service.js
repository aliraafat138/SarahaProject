import userModel from "../../../DB/Models/User.Model.js";
import { emailEvent } from "../../../utilis/email/events/email.event.js";
import { asyncHandler } from "../../../utilis/error/error.js";
import { successResponse } from "../../../utilis/response/successResponse.js";
import { generateEncryption } from "../../../utilis/security/encryption.js";
import { compareHash, generateHash } from "../../../utilis/security/hash.js";



export const signup = asyncHandler(async(req, res, next) => {
    const { userName, email, password, phone, age } = req.body;
    if (await userModel.findOne({ email })) {
        return next(new Error("Email Exist", { cause: 409 }))
    }
    const hashPassword = generateHash({ plainText: password })
    const encryptPhone = generateEncryption({ plainText: phone })
    const user = await userModel.create({ userName, email, phone: encryptPhone, password: hashPassword, age })
    emailEvent.emit('sendConfirmEmail', { email })
    return successResponse({ res, data: { user }, status: 201, message: "User Created Successfully" })
})

export const confirmEmail = asyncHandler(async(req, res, next) => {
    const { email, code } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("invalid account", { cause: 404 }))
    }
    if (user.confirmEmail) {
        return next(new Error("already confirmed", { cause: 409 }))
    }
    if (!compareHash({ plainText: code, hashValue: user.confirmEmailOTP })) {
        return next(new Error("Invalid Code", { cause: 400 }))
    }
    await userModel.updateOne({ email }, { confirmEmail: true, $unset: { confirmEmailOTP: 0 } })
    return successResponse({ res, data: { user } })
})