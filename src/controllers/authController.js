import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

/* =========================
   OTP STORE
========================= */

const otpStore = {};

/* =========================
   EMAIL CONFIG
========================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

/* =========================
   USER REGISTER
========================= */

export const register = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name,email,password,role,isVerified,status) VALUES (?,?,?,?,?,?)";

    db.query(
      sql,
      [name, email, hashedPassword, "user", 1, "active"],
      (err) => {

        if (err) {
          return res.status(500).json({ message: err.message });
        }

        res.json({ message: "User registered successfully" });
      }
    );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   AUTHOR REGISTER
========================= */

export const registerAuthor = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      biography,
      qualifications,
      experience
    } = req.body;

    /* manuscript upload */

    const manuscript = req.file ? req.file.filename : null;

    /* check existing email */

    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (err, result) => {

        if (result.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        /* insert user */

        db.query(

          `INSERT INTO users (name,email,password,role,isVerified,status)
           VALUES (?,?,?,?,?,?)`,

          [name, email, hashedPassword, "author", 1, "pending"],

          (err, userResult) => {

            if (err) {
              return res.status(500).json(err);
            }

            const userId = userResult.insertId;

            /* insert author profile */

            db.query(

              `INSERT INTO authors
               (userId,biography,qualifications,experience,status,manuscript)
               VALUES (?,?,?,?,?,?)`,

              [
                userId,
                biography,
                qualifications,
                experience,
                "pending",
                manuscript
              ],

              (err) => {

                if (err) {
                  return res.status(500).json(err);
                }

                res.json({
                  message: "Author request submitted successfully"
                });

              }

            );

          }

        );

      }

    );

  } catch (err) {

    console.log(err);

    res.status(500).json({ message: "Registration error" });

  }

};


/* =========================
   LOGIN
========================= */

export const login = (req, res) => {

  const { email, password, role } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND role=?";

  db.query(sql, [email, role], async (err, result) => {

    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (role === "author" && user.status !== "approved") {
      return res.status(403).json({
        message: "Author not approved by admin yet"
      });
    }

    /* generate OTP */

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Login OTP",
      text: `Your OTP is ${otp}`
    });

    res.json({ message: "OTP sent to email" });

  });

};


/* =========================
   VERIFY OTP
========================= */

export const verifyLoginOtp = (req, res) => {

  const { email, otp } = req.body;

  if (otpStore[email] != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], (err, result) => {

    if (err) return res.status(500).json({ message: err.message });

    const user = result[0];

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    delete otpStore[email];

    res.json({
      token,
      role: user.role
    });

  });

};


/* =========================
   RESEND OTP
========================= */

export const resendOtp = async (req, res) => {

  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = otp;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Resend OTP",
    text: `Your OTP is ${otp}`
  });

  res.json({ message: "OTP resent successfully" });

};