import userModel from "../DB/Models/User.Model.js";
import { asyncHandler } from "../utilis/error/error.js";
import { verifyToken } from "../utilis/security/token.js";
import messageModel from "../DB/Models/Message.Model.js";
export const authentication = asyncHandler(async(req, res, next) => {

    const { authorization } = req.headers;
    const [bearer, token] = authorization ? authorization.split(" ") : []
    let signature = undefined
    if (!bearer || !token) {
        return next(new Error("Invalid Token Component", { cause: 400 }))
    }

    switch (bearer) {
        case 'Bearer':
            signature = process.env.TOKEN_SIGNATURE
            break;
        case 'Admin':
            signature = process.env.TOKEN_ADMIN_SIGNATURE
            break;
        default:
            break;
    }

    const decoded = verifyToken({ token: token, signature: signature })
    if (!decoded || !decoded.id) {
        return next(new Error("Invalid Token ", { cause: 400 }))
    }

    const user = await userModel.findById(decoded.id)
    if (!user) {
        return next(new Error("User not Found", { cause: 404 }))
    }
    if (user.changeTimePassword && user.changeTimePassword.getTime() > decoded.iat * 1000) {
        return next(new Error("invalid credentials", { cause: 400 }))
    }
    req.user = user;
    return next()
})

export const authorization = asyncHandler(async(req, res, next) => {
    const messageId = req.params.messageId
    const message = await messageModel.findById(messageId)
    if (!message) {
        return next(new Error("Message not Found", { cause: 404 }))
    }
    if (message.recipientId.toString() !== req.user._id.toString()) {
        return next(new Error("You Are Not Authorized", { cause: 403 }))
    }
    req.message = message
    return next()
})