import express from "express";

import {
  addRating,
  getRatings,
  getRatingsWithBook,
  getAverageRating,
  getAuthorBooksRatings
} from "../controllers/ratingController.js";

const router = express.Router();

/* ADD RATING */
router.post("/", addRating);

/* ALL RATINGS */
router.get("/", getRatings);

/* ADMIN VIEW RATINGS WITH BOOK NAME */
router.get("/books", getRatingsWithBook);

/* GET AVERAGE RATING */
router.get("/average/:bookId", getAverageRating);

/* AUTHOR VIEW ONLY THEIR BOOK RATINGS */
router.get("/author/:authorId", getAuthorBooksRatings);

export default router;