import express from "express";
import { addReview, getBookReviews } from "../controllers/reviewController.js";

const router = express.Router();

/* Add review */
router.post("/", addReview);

/* Get reviews of a book */
router.get("/:bookId", getBookReviews);

export default router;