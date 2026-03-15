import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadManuscript } from "../controllers/manuscriptController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Manuscripts
 *   description: Author manuscript submission APIs
 */

/**
 * @swagger
 * /api/manuscripts:
 *   post:
 *     summary: Upload manuscript
 *     tags: [Manuscripts]
 */
router.post("/manuscripts", upload.single("file"), uploadManuscript);

export default router;