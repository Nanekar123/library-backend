import dotenv from "dotenv";
dotenv.config(); // load env first

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

// ROUTES
import bookRoutes from "./src/routes/bookRoutes.js";
import issueRoutes from "./src/routes/issueRoutes.js";
import ratingRoutes from "./src/routes/ratingRoutes.js";

// API ROUTES
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/ratings", ratingRoutes);

const PORT = process.env.PORT || 5000;

// Connect database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
