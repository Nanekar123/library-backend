import Rating from "../models/Rating.js";
import Book from "../models/Book.js";

export const addRating = async (req, res) => {
  try {

    const { bookId, rating } = req.body;

    // Save rating
    const newRating = new Rating({
      bookId,
      rating
    });

    await newRating.save();

    // Calculate new average rating
    const ratings = await Rating.find({ bookId });

    const avg =
      ratings.reduce((sum, r) => sum + r.rating, 0) /
      ratings.length;

    // Update book average rating
    await Book.findByIdAndUpdate(bookId, {
      averageRating: avg
    });

    res.status(201).json({
      message: "Rating added successfully",
      averageRating: avg
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Rating failed" });
  }
};