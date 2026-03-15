import express from "express";

import {
register,
registerAuthor,
login,
verifyLoginOtp,
resendOtp
} from "../controllers/authController.js";

import uploadManuscript from "../utils/uploadManuscript.js";

const router = express.Router();

/* USER REGISTER */

router.post("/register", register);

/* AUTHOR REGISTER WITH MANUSCRIPT */

router.post(
"/register-author",
uploadManuscript.single("manuscript"),
registerAuthor
);

/* LOGIN */

router.post("/login", login);

/* VERIFY OTP */

router.post("/verify-login-otp", verifyLoginOtp);

/* RESEND OTP */

router.post("/resend-otp", resendOtp);

export default router;