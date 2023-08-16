import express from "express";
import { getRandomMotivation } from "../controllers/motivationController.js";

const router = express.Router();

router.get("/motivation", getRandomMotivation);

export default router;
