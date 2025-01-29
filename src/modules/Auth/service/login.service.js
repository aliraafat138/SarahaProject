import userModel from "../../../DB/Models/User.Model.js";
import { emailEvent } from "../../../utilis/email/events/email.event.js";
import { asyncHandler } from "../../../utilis/error/error.js";
import { successResponse } from "../../../utilis/response/successResponse.js";
import { compareHash, generateHash } from "../../../utilis/security/hash.js";
import { generateToken } from "../../../utilis/security/token.js";

export const login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("Invalid Account", { cause: 404 }))

    }
    if (!user.confirmEmail) {
        return next(new Error("PleasE Confirm Email First", { cause: 404 }))
    }
    if (!compareHash({ plainText: password, hashValue: user.password })) {
        return next(new Error("Invalid Account", { cause: 404 }))
    }
    const token = generateToken({ payload: { id: user._id }, signature: process.env.TOKEN_SIGNATURE, options: { expiresIn: '1h' } })
    return successResponse({ res, data: { token } })
})

export const forgotPassword = asyncHandler(async(req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("Invalid Account", { cause: 404 }))

    }
    if (!user.confirmEmail) {
        return next(new Error("PleasE Confirm Email First", { cause: 404 }))
    }
    emailEvent.emit('forgot-Password', { email })
    return successResponse({ res })
})


export const resetPassword = asyncHandler(async(req, res, next) => {
    const { email, password, code } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("Invalid Account", { cause: 404 }))

    }
    if (!user.confirmEmail) {
        return next(new Error("PleasE Confirm Email First", { cause: 404 }))
    }
    if (!compareHash({ plainText: code, hashValue: user.resetPasswordOTP })) {
        return next(new Error("Invalid Code resetPassword", { cause: 400 }))
    }

    await userModel.updateOne({ email }, {
        password: generateHash({ plainText: password }),
        changeTimePassword: Date.now(),
        $unset: { resetPasswordOTP: 0 }
    })
    return successResponse({ res })
})