import express from "express"
import {addBankData,getData}from "../controllers/profileController.js"
import {authorization} from "../middleware/authorization.js"
const router= express.Router()


router.post("/add-bank",authorization,addBankData)
router.get("/add",getData)









export default router