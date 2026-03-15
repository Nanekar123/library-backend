import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* =========================
   REGISTER USER
========================= */
export const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // check if email already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {

      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already registered"
        });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql =
        "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";

      db.query(
        sql,
        [name, email, hashedPassword, role || "user"],
        (err, result) => {

          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.json({
            message: "User registered successfully",
            userId: result.insertId
          });

        }
      );

    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};

/* =========================
   LOGIN USER
========================= */
export const loginUser = (req, res) => {

  const { email, password, role } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Server error"
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = result[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // role verification
    if (role && user.role !== role) {
      return res.status(403).json({
        message: "Wrong login portal for this role"
      });
    }

    // create token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "library_secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  });

};

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = (req, res) => {

  const sql = "SELECT id,name,email,role FROM users";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(result);

  });

};

/* =========================
   GET SINGLE USER
========================= */
export const getUserById = (req, res) => {

  const { id } = req.params;

  const sql = "SELECT id,name,email,role FROM users WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(result[0]);

  });

};

/* =========================
   DELETE USER
========================= */
export const deleteUser = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json({
      message: "User deleted successfully"
    });

  });

};