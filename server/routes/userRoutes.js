import express from "express"
import {createUser, deleteUser,getUser,updateUserProfile } from "../controllers/userController.js"
import {loginHandler,passwordChangeHandler,authorizeUser, emailConfirmationHandler}from "../controllers/authController.js"
import { authorization } from "../middleware/authorization.js"
import {validateInputs} from "../middleware/validator.js"
import {userRules}from "../validation/rules.js"
const router= express.Router()

router.post("/create-user",validateInputs(userRules),createUser)
router.post("/login",loginHandler)
router.delete("/:id", authorization,deleteUser);
router.put("/change-password/:id",authorization,passwordChangeHandler)
router.put("/update-profile/:id",authorization,updateUserProfile)
router.get("/profile/:id",authorization,getUser)
router.get('/authorize-user', authorization, authorizeUser)

router.get('/confirm-email/:token', emailConfirmationHandler)  //Eu-day3
export default router