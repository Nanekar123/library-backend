import express from "express";
import { getNotifications } from "../controllers/notificationController.js";

const router = express.Router();

/* GET USER NOTIFICATIONS */

router.get("/:userId", getNotifications);

export default router;