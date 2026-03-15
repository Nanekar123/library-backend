import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

/* NEW ROUTES */

import authorRoutes from "./routes/authorRoutes.js";
import manuscriptRoutes from "./routes/manuscriptRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

/* SERVE UPLOADS */

app.use("/uploads", express.static("uploads"));

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);

/* AUTHOR DASHBOARD ROUTES */

app.use("/api/author", authorRoutes);

/* MANUSCRIPTS */

app.use("/api/manuscripts", manuscriptRoutes);

export default app;
