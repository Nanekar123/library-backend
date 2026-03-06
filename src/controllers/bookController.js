import Book from "../models/Book.js";

// ➕ Add Book
export const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📖 Get All Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Book
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✏️ UPDATE BOOK
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,   // id from URL
      req.body,        // new data
      { new: true }    // return updated data
    );

    res.json({
      message: "Book updated successfully",
      updatedBook
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};