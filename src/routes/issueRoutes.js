import express from "express";
import {
  issueBook,
  returnBook,
  getAllIssues,
  getActiveIssues
} from "../controllers/issueController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Book issue and return APIs
 */

/**
 * @swagger
 * /api/issues:
 *   post:
 *     summary: Issue a book
 *     tags: [Rentals]
 */
router.post("/", issueBook);

/**
 * @swagger
 * /api/issues/return/{id}:
 *   put:
 *     summary: Return a book
 *     tags: [Rentals]
 */
router.put("/return/:id", returnBook);

/**
 * @swagger
 * /api/issues:
 *   get:
 *     summary: Get all issue history
 *     tags: [Rentals]
 */
router.get("/", getAllIssues);

/**
 * @swagger
 * /api/issues/active:
 *   get:
 *     summary: Get active issues
 *     tags: [Rentals]
 */
router.get("/active", getActiveIssues);

export default router;