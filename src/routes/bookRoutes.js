import express from "express";
import {
  addBook,
  getBooks,
  deleteBook,
  updateBook
} from "../controllers/bookController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Everyone logged in can see books
router.get("/", protect, getBooks);

// Only ADMIN can add books
router.post("/", protect, authorizeRoles("ADMIN"), addBook);

// Only ADMIN can update books
router.put("/:id", protect, authorizeRoles("ADMIN"), updateBook);

// Only ADMIN can delete books
router.delete("/:id", protect, authorizeRoles("ADMIN"), deleteBook);

export default router;