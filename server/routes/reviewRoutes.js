import express from "express"
import { createReview, getAllReviews } from '../controllers/reviewController.js';



const router= express.Router()


router.post("/review-create",createReview);
router.get("/all-reviews",getAllReviews);



export default router