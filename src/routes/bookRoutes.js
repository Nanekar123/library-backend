import express from "express";
import {
  getBooks,
  getAuthorBooks,
  addBook,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 */
router.get("/", protect, getBooks);

/**
 * @swagger
 * /api/books/author:
 *   get:
 *     summary: Get books of logged in author
 *     tags: [Books]
 */
router.get("/author", protect, authorizeRoles("author"), getAuthorBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Admin add new book
 *     tags: [Books]
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]),
  addBook
);

/**
 * @swagger
 * /api/books/author:
 *   post:
 *     summary: Author add own book
 *     tags: [Books]
 */
router.post(
  "/author",
  protect,
  authorizeRoles("author"),
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]),
  addBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Admin update book
 *     tags: [Books]
 */
router.put("/:id", protect, authorizeRoles("admin"), updateBook);

/**
 * @swagger
 * /api/books/author/{id}:
 *   put:
 *     summary: Author update own book
 *     tags: [Books]
 */
router.put("/author/:id", protect, authorizeRoles("author"), updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Admin delete book
 *     tags: [Books]
 */
router.delete("/:id", protect, authorizeRoles("admin"), deleteBook);

/**
 * @swagger
 * /api/books/author/{id}:
 *   delete:
 *     summary: Author delete own book
 *     tags: [Books]
 */
router.delete("/author/:id", protect, authorizeRoles("author"), deleteBook);

export default router;