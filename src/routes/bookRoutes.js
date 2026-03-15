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

/* ================= GET BOOKS ================= */

/* User / Admin / Author can view books */
router.get("/", protect, getBooks);

/* Author: get own books */
router.get("/author", protect, authorizeRoles("author"), getAuthorBooks);


/* ================= ADD BOOK ================= */

/* Admin: add book for any author */
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

/* Author: add own book */
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


/* ================= UPDATE BOOK ================= */

/* Admin update any book */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateBook
);

/* Author update own book */
router.put(
  "/author/:id",
  protect,
  authorizeRoles("author"),
  updateBook
);


/* ================= DELETE BOOK ================= */

/* Admin delete any book */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteBook
);

/* Author delete own book */
router.delete(
  "/author/:id",
  protect,
  authorizeRoles("author"),
  deleteBook
);

export default router;