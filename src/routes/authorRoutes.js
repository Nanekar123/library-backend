import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAuthorProfile,
  getAuthorBooks,
  getAuthorRatings,
  getAuthorReviews,
  getAuthorIssues,
  getAuthorPerformance,
  getPendingAuthors,
  approveAuthor,
  rejectAuthor
} from "../controllers/authorController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management APIs
 */

/**
 * @swagger
 * /api/authors/me:
 *   get:
 *     summary: Get logged-in author profile
 *     tags: [Authors]
 */
router.get("/me", protect, getAuthorProfile);

/**
 * @swagger
 * /api/authors/books/{authorId}:
 *   get:
 *     summary: Get author books
 *     tags: [Authors]
 */
router.get("/books/:authorId", getAuthorBooks);

/**
 * @swagger
 * /api/authors/ratings/{authorId}:
 *   get:
 *     summary: Get author ratings
 *     tags: [Authors]
 */
router.get("/ratings/:authorId", getAuthorRatings);

/**
 * @swagger
 * /api/authors/reviews/{authorId}:
 *   get:
 *     summary: Get author reviews
 *     tags: [Authors]
 */
router.get("/reviews/:authorId", getAuthorReviews);

/**
 * @swagger
 * /api/authors/issues/{authorId}:
 *   get:
 *     summary: Get author issues
 *     tags: [Authors]
 */
router.get("/issues/:authorId", getAuthorIssues);

/**
 * @swagger
 * /api/authors/performance/{authorId}:
 *   get:
 *     summary: Get author performance
 *     tags: [Authors]
 */
router.get("/performance/:authorId", getAuthorPerformance);

/**
 * @swagger
 * /api/authors/pending:
 *   get:
 *     summary: Get pending authors
 *     tags: [Authors]
 */
router.get("/pending", getPendingAuthors);

/**
 * @swagger
 * /api/authors/approve/{id}:
 *   put:
 *     summary: Approve author
 *     tags: [Authors]
 */
router.put("/approve/:id", approveAuthor);

/**
 * @swagger
 * /api/authors/reject/{id}:
 *   put:
 *     summary: Reject author
 *     tags: [Authors]
 */
router.put("/reject/:id", rejectAuthor);

export default router;