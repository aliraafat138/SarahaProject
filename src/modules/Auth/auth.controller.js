import { Router } from "express";
import { confirmEmail, signup } from "./service/registration.service.js";
import { forgotPassword, login, resetPassword } from "./service/login.service.js";
import * as validators from "../Auth/auth.validation.js"
import { validation } from "../../middleware/validation.middleware.js";
const router = Router()
router.post('/signup', validation(validators.signup), signup)
router.post('/login', validation(validators.login), login)
router.patch('/confirmEmail', validation(validators.confirmEmail), confirmEmail)
router.patch('/forgetPassword', validation(validators.forgetPassword), forgotPassword)
router.patch('/resetPassword', validation(validators.resetPassword), resetPassword)
export default router