import express from "express";
import { toggleWishlist, getWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist APIs
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add or remove book from wishlist
 *     tags: [Wishlist]
 */
router.post("/", toggleWishlist);

/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Get user wishlist
 *     tags: [Wishlist]
 */
router.get("/:userId", getWishlist);

export default router;