import req from "express/lib/request.js";
import userModel from "../../../DB/Models/User.Model.js";
import { asyncHandler } from "../../../utilis/error/error.js";
import { successResponse } from "../../../utilis/response/successResponse.js";
import { compareHash, generateHash } from "../../../utilis/security/hash.js";
import messageModel from "../../../DB/Models/Message.Model.js";

export const updateUser = asyncHandler(async(req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
    return successResponse({ res, data: { user }, message: "user updated successfully" })
})

export const deleteUser = asyncHandler(async(req, res, next) => {
    const user = await userModel.deleteOne({ _id: req.user._id })
    return successResponse({ res, message: "user deleted successfully" })
})

export const findUser = asyncHandler(async(req, res, next) => {
    const message = await messageModel.find({ recipientId: req.user._id }).populate([{
        path: "recipientId",
        select: "-password"
    }])
    return successResponse({ res, data: { message } })
})

export const updatePassword = asyncHandler(async(req, res, next) => {
    const { oldPassword, password } = req.body
    if (!compareHash({ plainText: oldPassword, hashValue: req.user.password })) {
        return next(new Error("Invalid Old Password", { cause: 409 }))
    }
    const hashPassword = generateHash({ plainText: password })
    const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { password: hashPassword, changeTimePassword: Date.now() }, { new: true, runValidators: true })
    return successResponse({ res, data: { user }, message: "password updated successfully" })
})

export const freezeProfile = asyncHandler(async(req, res, next) => {
    const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { isDeleted: true, changeTimePassword: Date.now() }, { new: true, runValidators: true })
    return successResponse({ res, data: { user }, message: "user Deactivated successfully" })
})

export const shareProfile = asyncHandler(async(req, res, next) => {
    const user = await userModel.findById({ _id: req.params.userId, isDeleted: false })
    return user ? successResponse({ res, data: { user } }) : next(new Error("Invalid Account", { cause: 404 }))
})