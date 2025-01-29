import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

export const CreateMessage = Joi.object().keys({
    recipientId: generalFields.id.required(),
    message: generalFields.message.required()
}).required()