import db from "../config/db.js";

/* ISSUE BOOK */

export const issueBook = (req, res) => {

  const { userId, bookId } = req.body;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  db.query(
    "INSERT INTO issues (userId, bookId, dueDate, status) VALUES (?,?,?,?)",
    [userId, bookId, dueDate, "ISSUED"],
    (err) => {

      if (err) return res.status(500).json(err);

      /* decrease available copies */

      db.query(
        "UPDATE books SET available = available - 1 WHERE id=? AND available>0",
        [bookId]
      );

      res.json({ message: "Book issued successfully" });

    }
  );
};

/* RETURN BOOK */

export const returnBook = (req, res) => {

  const issueId = req.params.id;

  db.query(
    "SELECT * FROM issues WHERE id=?",
    [issueId],
    (err, result) => {

      if (err) return res.status(500).json(err);

      const issue = result[0];

      const due = new Date(issue.dueDate);
      const today = new Date();

      let fine = 0;

      if (today > due) {

        const diff = Math.ceil(
          (today - due) / (1000 * 60 * 60 * 24)
        );

        fine = diff * 10;

      }

      db.query(
        "UPDATE issues SET status='RETURNED', returnDate=NOW(), fine=? WHERE id=?",
        [fine, issueId]
      );

      db.query(
        "UPDATE books SET available = available + 1 WHERE id=?",
        [issue.bookId]
      );

      res.json({
        message: "Book returned successfully",
        fine
      });

    }
  );
};

/* ALL ISSUES */

export const getAllIssues = (req, res) => {

  const sql = `
  SELECT issues.*, books.title
  FROM issues
  JOIN books ON issues.bookId = books.id
  `;

  db.query(sql, (err, result) => {

    if (err) return res.status(500).json(err);

    res.json(result);

  });
};

/* ACTIVE ISSUES */

export const getActiveIssues = (req, res) => {

  db.query(
    "SELECT * FROM issues WHERE status='ISSUED'",
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json(result);

    }
  );

};