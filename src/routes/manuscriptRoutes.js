import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadManuscript } from "../controllers/manuscriptController.js";

const router = express.Router();

router.post("/manuscripts", upload.single("file"), uploadManuscript);

export default router;