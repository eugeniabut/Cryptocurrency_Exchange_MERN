import express from "express"
import {createReview} from "../controllers/reviewController.js" 


const router= express.Router()


router.post("/review-create",createReview)
//router.get("/get-review",getReview)

export default router