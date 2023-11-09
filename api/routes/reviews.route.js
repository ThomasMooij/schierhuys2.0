import express from "express"
import {verifyToken} from "../functions/jwt.js"
import {createReview, getReviews,getReview, deleteReview} from "../controllers/reviews.controller.js"

const router = express.Router()

router.post("/", verifyToken, createReview)
router.get("/", getReviews)
router.get("/:id", getReview)
router.delete("/:id", verifyToken, deleteReview)

export default router