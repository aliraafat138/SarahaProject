import { Router } from "express";
import { createMessage, deleteMessage } from "./service/message.service.js";
import * as validators from './message.validation.js'
import { validation } from "../../middleware/validation.middleware.js";
import { authentication, authorization } from "../../middleware/auth.middleware.js";
const router = Router()
router.post('/create', validation(validators.CreateMessage), createMessage)
router.delete('/delete/:messageId', authentication, authorization, deleteMessage)
export default router