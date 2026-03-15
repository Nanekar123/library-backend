import db from "../config/db.js";


/* =========================
   ADD RATING
========================= */

export const addRating = (req, res) => {

  const { bookId, rating } = req.body;

  if (!bookId || !rating) {
    return res.status(400).json({
      message: "BookId and rating are required"
    });
  }

  const sql = `
    INSERT INTO ratings (bookId, rating)
    VALUES (?,?)
  `;

  db.query(sql, [bookId, rating], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.json({
      message: "Rating added successfully"
    });

  });

};


/* =========================
   GET ALL RATINGS
========================= */

export const getRatings = (req, res) => {

  const sql = `
    SELECT * FROM ratings
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.json(result);

  });

};


/* =========================
   GET RATINGS WITH BOOK NAME
========================= */

export const getRatingsWithBook = (req, res) => {

  const sql = `
    SELECT 
      ratings.id,
      ratings.bookId,
      books.title,
      ratings.rating
    FROM ratings
    JOIN books ON ratings.bookId = books.id
    ORDER BY ratings.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.json(result);

  });

};


/* =========================
   GET AVERAGE RATING
========================= */

export const getAverageRating = (req, res) => {

  const bookId = req.params.bookId;

  const sql = `
    SELECT AVG(rating) AS averageRating
    FROM ratings
    WHERE bookId = ?
  `;

  db.query(sql, [bookId], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.json({
      bookId: bookId,
      averageRating: result[0].averageRating
    });

  });

};


/* =========================
   AUTHOR BOOK RATINGS
========================= */

export const getAuthorBooksRatings = (req, res) => {

  const authorId = req.params.authorId;

  const sql = `
  SELECT 
    b.id,
    b.title,
    b.category,
    AVG(r.rating) AS rating,
    COUNT(r.id) AS reviews
  FROM books b
  LEFT JOIN ratings r ON b.id = r.bookId
  WHERE b.author_id = ?
  GROUP BY b.id
  `;

  db.query(sql, [authorId], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.json(result);

  });

};