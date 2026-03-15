import express from "express";
import { getNotifications } from "../controllers/notificationController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification APIs
 */

/**
 * @swagger
 * /api/notifications/{userId}:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notifications]
 */
router.get("/:userId", getNotifications);

export default router;