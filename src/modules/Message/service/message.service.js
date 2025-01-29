import messageModel from "../../../DB/Models/Message.Model.js";
import userModel from "../../../DB/Models/User.Model.js";
import { asyncHandler } from "../../../utilis/error/error.js";
import { successResponse } from "../../../utilis/response/successResponse.js";

export const createMessage = asyncHandler(async(req, res, next) => {
    const { recipientId, message } = req.body;
    if (!await userModel.findOne({ _id: recipientId, isDeleted: false })) {
        return next(new Error("Invalid Account", { cause: 404 }))
    }

    const newMessage = await messageModel.create({ recipientId, message })
    return successResponse({ res, data: { newMessage }, status: 201 })
})


export const deleteMessage = asyncHandler(async(req, res, next) => {
    const messageId = req.params.messageId
    const delMessage = await messageModel.deleteOne({ _id: messageId })
    if (delMessage.deletedCount === 0) {
        return next(new Error("Fail To Delete Message", { cause: 500 }))
    }
    return successResponse({ res })
})