import express from "express";
import { addReview, getBookReviews } from "../controllers/reviewController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book review APIs
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add review
 *     tags: [Reviews]
 */
router.post("/", addReview);

/**
 * @swagger
 * /api/reviews/{bookId}:
 *   get:
 *     summary: Get reviews of a book
 *     tags: [Reviews]
 */
router.get("/:bookId", getBookReviews);

export default router;