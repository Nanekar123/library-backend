import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email });
  }

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;

  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`
  });

  res.json({ message: "OTP sent to email" });
};

export const register = async (req, res) => {
  const { name, email, password, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // ✅ Fix OTP comparison
  if (String(user.otp) !== String(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // ✅ Check expiry
  if (user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.name = name;
  user.password = hashedPassword;
  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({ message: "Registration successful" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    return res.status(400).json({ message: "User not found or not verified" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};