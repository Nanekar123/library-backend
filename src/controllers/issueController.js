import Issue from "../models/Issue.js";
import Book from "../models/Book.js";


// 📚 ISSUE BOOK
export const issueBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "Missing userId or bookId" });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check available copies
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Prevent duplicate issue
    const alreadyIssued = await Issue.findOne({
      userId,
      bookId,
      status: "ISSUED"
    });

    if (alreadyIssued) {
      return res.status(400).json({
        message: "You already issued this book"
      });
    }

    // Reduce available copies
    book.availableCopies -= 1;
    await book.save();

    // Set due date (7 days)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const issue = new Issue({
      userId,
      bookId,
      dueDate,
      status: "ISSUED"
    });

    await issue.save();

    res.json({
      message: "Book issued successfully",
      issue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔁 RETURN BOOK
export const returnBook = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate("bookId");

    if (!issue) {
      return res.status(404).json({ message: "Issue record not found" });
    }

    if (issue.status === "RETURNED") {
      return res.status(400).json({ message: "Book already returned" });
    }

    const returnDate = new Date();
    issue.returnDate = returnDate;

    // Fine calculation
    let fine = 0;

    if (returnDate > issue.dueDate) {
      const oneDay = 1000 * 60 * 60 * 24;
      const lateDays = Math.ceil(
        (returnDate - issue.dueDate) / oneDay
      );
      fine = lateDays * 10; // ₹10 per day
    }

    issue.fine = fine;
    issue.status = "RETURNED";

    await issue.save();

    // Increase book copies
    issue.bookId.availableCopies += 1;
    await issue.bookId.save();

    res.json({
      message: "Book returned successfully",
      fine
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 📋 GET ALL ISSUE HISTORY
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("userId", "name email")
      .populate("bookId", "title author");

    res.json(issues);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 📌 GET ACTIVE (NOT RETURNED)
export const getActiveIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ status: "ISSUED" })
      .populate("userId", "name")
      .populate("bookId", "title");

    res.json(issues);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};