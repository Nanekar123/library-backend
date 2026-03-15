import express from "express";

import {
  addRating,
  getRatings,
  getRatingsWithBook,
  getAverageRating,
  getAuthorBooksRatings
} from "../controllers/ratingController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Book rating APIs
 */

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Add rating
 *     tags: [Ratings]
 */
router.post("/", addRating);

/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Get all ratings
 *     tags: [Ratings]
 */
router.get("/", getRatings);

/**
 * @swagger
 * /api/ratings/books:
 *   get:
 *     summary: Get ratings with book name
 *     tags: [Ratings]
 */
router.get("/books", getRatingsWithBook);

/**
 * @swagger
 * /api/ratings/average/{bookId}:
 *   get:
 *     summary: Get average rating
 *     tags: [Ratings]
 */
router.get("/average/:bookId", getAverageRating);

/**
 * @swagger
 * /api/ratings/author/{authorId}:
 *   get:
 *     summary: Get ratings of author's books
 *     tags: [Ratings]
 */
router.get("/author/:authorId", getAuthorBooksRatings);

export default router;