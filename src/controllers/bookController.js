import db from "../config/db.js";

/* ================= GET ALL BOOKS (USER / ADMIN) ================= */
export const getBooks = (req, res) => {

  const sql = `
    SELECT 
      b.id,
      b.title,
      b.category,
      b.isbn,
      b.quantity,
      b.available,
      b.pdf_url,
      b.image_url,
      b.author_id,
      u.name AS authorName
    FROM books b
    LEFT JOIN users u ON b.author_id = u.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    res.json(result);
  });
};


/* ================= GET AUTHOR BOOKS ================= */

export const getAuthorBooks = (req, res) => {

  const authorId = req.user.id;

  const sql = "SELECT * FROM books WHERE author_id=?";

  db.query(sql, [authorId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    res.json(result);
  });

};


/* ================= ADD BOOK ================= */

export const addBook = (req, res) => {

  const { title, category, isbn, quantity } = req.body;

  let authorId = req.body.authorId;

  if (req.user.role === "author") {
    authorId = req.user.id;
  }

  const pdfUrl = req.files?.pdf
    ? `uploads/pdfs/${req.files.pdf[0].filename}`
    : null;

  const imageUrl = req.files?.image
    ? `uploads/images/${req.files.image[0].filename}`
    : null;

  const sql = `
    INSERT INTO books
    (title, author_id, category, isbn, quantity, available, pdf_url, image_url)
    VALUES (?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [title, authorId, category, isbn, quantity, quantity, pdfUrl, imageUrl],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Book added successfully" });
    }
  );

};


/* ================= UPDATE BOOK ================= */

export const updateBook = (req, res) => {

  const { id } = req.params;

  const { title, category, quantity } = req.body;

  let authorId =
    req.user.role === "author" ? req.user.id : req.body.authorId;

  const sql = `
    UPDATE books
    SET title=?, category=?, quantity=?, author_id=?
    WHERE id=? ${req.user.role === "author" ? "AND author_id=?" : ""}
  `;

  const params =
    req.user.role === "author"
      ? [title, category, quantity, authorId, id, authorId]
      : [title, category, quantity, authorId, id];

  db.query(sql, params, (err, result) => {

    if (err) return res.status(500).json({ message: err.message });

    if (req.user.role === "author" && result.affectedRows === 0) {
      return res.status(403).json({
        message: "You can only update your own books"
      });
    }

    res.json({ message: "Book updated successfully" });

  });

};


/* ================= DELETE BOOK ================= */

export const deleteBook = (req, res) => {

  const { id } = req.params;

  const sql =
    req.user.role === "author"
      ? "DELETE FROM books WHERE id=? AND author_id=?"
      : "DELETE FROM books WHERE id=?";

  const params =
    req.user.role === "author"
      ? [id, req.user.id]
      : [id];

  db.query(sql, params, (err, result) => {

    if (err) return res.status(500).json({ message: err.message });

    if (req.user.role === "author" && result.affectedRows === 0) {
      return res.status(403).json({
        message: "You can only delete your own books"
      });
    }

    res.json({ message: "Book deleted successfully" });

  });

};