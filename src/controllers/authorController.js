import db from "../config/db.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ================= HELPER ================= */
const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

/* ================= PENDING AUTHORS ================= */
export const getPendingAuthors = async (req, res) => {
  try {
    const sql = `
      SELECT 
        users.id,
        users.name,
        users.email,
        authors.biography,
        authors.qualifications,
        authors.experience,
        authors.manuscript
      FROM users
      JOIN authors ON users.id = authors.userId
      WHERE authors.status = 'pending'
    `;
    const result = await query(sql);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= APPROVE AUTHOR ================= */
export const approveAuthor = async (req, res) => {
  const id = req.params.id;
  try {
    await query("UPDATE authors SET status='approved' WHERE userId=?", [id]);
    await query("UPDATE users SET status='approved', role='author' WHERE id=?", [id]);
    await query(
      "INSERT INTO notifications (userId,type,message) VALUES (?,?,?)",
      [id, "author_approved", "Your author request has been approved by admin."]
    );

    const [author] = await query("SELECT email, name FROM users WHERE id=?", [id]);

    await sendEmail(
      author.email,
      "Author Request Approved ✅",
      `Hello ${author.name},<br><br>
       Your author request has been <strong>approved</strong>. You can now log in and start uploading books.<br><br>
       Regards,<br>Library Team`
    );

    res.json({ message: "Author approved and email sent" });
  } catch (err) {
    console.log("Approve error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= REJECT AUTHOR ================= */
export const rejectAuthor = async (req, res) => {
  const id = req.params.id;
  try {
    const [author] = await query("SELECT email, name FROM users WHERE id=?", [id]);
    await query("UPDATE users SET status='rejected' WHERE id=?", [id]);
    await query(
      "INSERT INTO notifications (userId,type,message) VALUES (?,?,?)",
      [id, "author_rejected", "Your author request has been rejected by admin."]
    );

    await sendEmail(
      author.email,
      "Author Request Rejected ❌",
      `Hello ${author.name},<br><br>
       We regret to inform you that your author request has been <strong>rejected</strong>.<br>
       You may contact admin for more information.<br><br>
       Regards,<br>Library Team`
    );

    res.json({ message: "Author rejected and email sent" });
  } catch (err) {
    console.log("Reject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET LOGGED-IN AUTHOR PROFILE ================= */
export const getAuthorProfile = async (req, res) => {
  try {
    const authorId = req.user.id;
    const sql = `
      SELECT u.id, u.name, u.email, a.biography, a.qualifications, a.experience, a.status
      FROM users u
      LEFT JOIN authors a ON u.id = a.userId
      WHERE u.id = ?
    `;
    const [result] = await query(sql, [authorId]);
    if (!result) return res.status(404).json({ message: "Author not found" });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= AUTHOR DASHBOARD FUNCTIONS ================= */
export const getAuthorBooks = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const result = await query("SELECT * FROM books WHERE author_id=?", [authorId]);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAuthorRatings = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const sql = `
      SELECT r.*, b.title
      FROM ratings r
      JOIN books b ON r.bookId = b.id
      WHERE b.author_id = ?
    `;
    const result = await query(sql, [authorId]);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAuthorReviews = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const sql = `
      SELECT rv.*, b.title
      FROM reviews rv
      JOIN books b ON rv.book_id = b.id
      WHERE b.author_id = ?
    `;
    const result = await query(sql, [authorId]);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAuthorIssues = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const sql = `
      SELECT i.*, b.title
      FROM issues i
      JOIN books b ON i.bookId = b.id
      WHERE b.author_id = ?
    `;
    const result = await query(sql, [authorId]);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= PERFORMANCE / DASHBOARD STATS ================= */
export const getAuthorPerformance = async (req, res) => {
  try {
    const authorId = req.params.authorId;

    // Total books
    const [booksResult] = await query(
      "SELECT COUNT(*) AS totalBooks FROM books WHERE author_id=?",
      [authorId]
    );

    // Total reviews
    const [reviewsResult] = await query(
      `SELECT COUNT(rv.id) AS totalReviews, AVG(r.rating) AS avgRating
       FROM books b
       LEFT JOIN reviews rv ON b.id = rv.book_id
       LEFT JOIN ratings r ON b.id = r.bookId
       WHERE b.author_id=?`,
      [authorId]
    );

    // Total issues
    const [issuesResult] = await query(
      `SELECT COUNT(i.id) AS totalIssues
       FROM books b
       LEFT JOIN issues i ON b.id = i.bookId
       WHERE b.author_id=?`,
      [authorId]
    );

    res.json({
      totalBooks: booksResult.totalBooks,
      totalReviews: reviewsResult.totalReviews || 0,
      avgRating: reviewsResult.avgRating ? Number(reviewsResult.avgRating).toFixed(2) : 0,
      totalIssues: issuesResult.totalIssues || 0
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
