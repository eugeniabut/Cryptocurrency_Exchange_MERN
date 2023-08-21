import express from "express"
import {addBankData,getData, getUserBank}from "../controllers/profileController.js"
import {authorization} from "../middleware/authorization.js"
const router= express.Router()


router.post("/add-bank/:id",authorization,addBankData)
router.get("/bank-data",authorization,getData)
router.get("/user-bank/:id",authorization,getUserBank)












export default router