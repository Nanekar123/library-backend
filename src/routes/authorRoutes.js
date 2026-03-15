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

// Logged-in author profile
router.get("/me", protect, getAuthorProfile);

// Author dashboard endpoints
router.get("/books/:authorId", getAuthorBooks);
router.get("/ratings/:authorId", getAuthorRatings);
router.get("/reviews/:authorId", getAuthorReviews);
router.get("/issues/:authorId", getAuthorIssues);
router.get("/performance/:authorId", getAuthorPerformance);

// Admin endpoints
router.get("/pending", getPendingAuthors);
router.put("/approve/:id", approveAuthor);
router.put("/reject/:id", rejectAuthor);

export default router;