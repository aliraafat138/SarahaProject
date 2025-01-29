import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

export const updateUser = Joi.object().keys({
    userName: generalFields.userName.required(),
    phone: generalFields.phone.required()
}).required()

export const updatePassword = Joi.object().keys({
    oldPassword: generalFields.password.required(),
    password: generalFields.password.not(Joi.ref('oldPassword')).required(),
    confirmPassword: generalFields.confirmPassword.valid(Joi.ref('password'))
}).required()
export const ShareProfile = Joi.object().keys({
    userId: generalFields.id.required()
}).required()