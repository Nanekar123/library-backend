import express from "express";
import {
  issueBook,
  returnBook,
  getAllIssues,
  getActiveIssues
} from "../controllers/issueController.js";

const router = express.Router();

// 📚 issue a book
router.post("/", issueBook);

// 🔁 return a book
router.put("/return/:id", returnBook);

// 📋 get all issue history
router.get("/", getAllIssues);

// 📌 get only active (not returned)
router.get("/active", getActiveIssues);

export default router;