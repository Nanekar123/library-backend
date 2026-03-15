import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // Use Gmail App Password
  },
});

// Send email function
export const sendEmail = async (to, subject, messageHtml) => {
  try {
    await transporter.sendMail({
      from: `"Library Admin" <${process.env.EMAIL}>`,
      to: to,
      subject: subject,
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #0a0a0f; color: #fff; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #111; border: 2px solid gold; border-radius: 10px; padding: 25px;">
            <h2 style="color: gold; text-align: center; letter-spacing: 1px;">Library Management System</h2>
            <hr style="border: 1px solid gold; margin: 20px 0;" />
            <div style="font-size: 16px; line-height: 1.6;">
              ${messageHtml}
            </div>
            <hr style="border: 1px solid gold; margin: 20px 0;" />
            <p style="text-align: center; color: #aaa; font-size: 12px;">
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      `,
    });
    console.log("Email sent successfully to", to);
  } catch (err) {
    console.log("Email error:", err);
  }
};