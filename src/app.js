import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

/* ROUTES */

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import manuscriptRoutes from "./routes/manuscriptRoutes.js";

const app = express();

/* FIX FOR __dirname IN ES MODULES */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* SERVE UPLOADS (PDF / IMAGES) */

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* SWAGGER API DOCUMENTATION */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* EXPORT SWAGGER JSON FOR POSTMAN */

app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

/* API ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);

/* AUTHOR DASHBOARD */

app.use("/api/author", authorRoutes);

/* MANUSCRIPT SUBMISSION */

app.use("/api/manuscripts", manuscriptRoutes);

/* ROOT TEST ROUTE */

app.get("/", (req, res) => {
  res.send("Library Management System API is running...");
});

/* 404 HANDLER */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;