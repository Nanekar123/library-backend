import express from "express";
import { getDashboardStats } from "../controllers/analyticsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Admin analytics APIs
 */

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Analytics]
 */
router.get("/", getDashboardStats);

export default router;