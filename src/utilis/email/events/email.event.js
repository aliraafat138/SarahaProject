import { EventEmitter } from "events";
import { confirmEmailTemplate } from "../template/confirmEmail.template.js";
import { sendEmail } from "../send.email.js";
import { customAlphabet } from "nanoid";
import { generateHash } from "../../security/hash.js";
import userModel from "../../../DB/Models/User.Model.js";
export const emailEvent = new EventEmitter()

emailEvent.on("sendConfirmEmail", async(data) => {
    const { email } = data
    const OTP = customAlphabet("0123456789", 4)()
    const hashOTP = generateHash({ plainText: OTP })
    await userModel.updateOne({ email }, { confirmEmailOTP: hashOTP })
    const html = confirmEmailTemplate({ code: OTP })
    await sendEmail({ to: email, subject: 'confirmEmail', html })
})
emailEvent.on("forgot-Password", async(data) => {
    const { email } = data
    const OTP = customAlphabet("0123456789", 4)()
    const hashOTP = generateHash({ plainText: OTP })
    await userModel.updateOne({ email }, { resetPasswordOTP: hashOTP })
    const html = confirmEmailTemplate({ code: OTP })
    await sendEmail({ to: email, subject: 'forgetPassword', html })
})