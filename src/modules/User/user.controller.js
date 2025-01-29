import { Router } from "express";
import { deleteUser, findUser, freezeProfile, shareProfile, updatePassword, updateUser } from "./service/user.service.js";
import { authentication } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from './user.validation.js'
const router = Router()
router.patch('/update', authentication, validation(validators.updateUser), updateUser)
router.delete('/delete', authentication, deleteUser)
router.get('/find', authentication, findUser)
router.patch('/updatePassword', authentication, validation(validators.updatePassword), updatePassword)
router.delete('/freeze', authentication, freezeProfile)
router.get('/share/:userId', authentication, validation(validators.ShareProfile), shareProfile)
export default router