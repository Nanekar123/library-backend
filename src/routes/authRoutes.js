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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register normal user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", register);


/**
 * @swagger
 * /api/auth/register-author:
 *   post:
 *     summary: Register author with manuscript upload
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               manuscript:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Author registered successfully
 */
router.post(
"/register-author",
uploadManuscript.single("manuscript"),
registerAuthor
);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 */
router.post("/login", login);


/**
 * @swagger
 * /api/auth/verify-login-otp:
 *   post:
 *     summary: Verify login OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/verify-login-otp", verifyLoginOtp);


/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend OTP to user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OTP resent successfully
 */
router.post("/resend-otp", resendOtp);


export default router;