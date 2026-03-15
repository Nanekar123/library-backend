import db from "../config/db.js";

/* ================= ADD REVIEW ================= */

export const addReview = (req, res) => {

  const { userId, bookId, review } = req.body;

  db.query(
    "INSERT INTO reviews (user_id, book_id, review) VALUES (?,?,?)",
    [userId, bookId, review],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Review failed" });
      }

      res.json({ message: "Review added successfully" });

    }
  );

};


/* ================= GET REVIEWS FOR BOOK ================= */

export const getBookReviews = (req, res) => {

  const bookId = req.params.bookId;

  db.query(

    `SELECT users.name, reviews.review, reviews.created_at
     FROM reviews
     JOIN users ON users.id = reviews.user_id
     WHERE reviews.book_id=?`,

    [bookId],

    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json(result);

    }

  );

};