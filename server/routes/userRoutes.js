import express from "express"
import {createUser, deleteUser ,updateUserProfile} from "../controllers/userController.js"
import {loginHandler,passwordChangeHandler}from "../controllers/authController.js"
import { authorization } from "../middleware/authorization.js"
import {validateInputs} from "../middleware/validator.js"
import {userRules}from "../validation/rules.js"
const router= express.Router()

router.post("/create-user",validateInputs(userRules),createUser)
router.post("/login",loginHandler)
router.delete("/:id", authorization,deleteUser);
router.put("/change-password/:id",authorization,passwordChangeHandler)
router.patch('/update-user', authorization, updateUserProfile )

export default router
