import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import db from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

/* ============================ */
/* MySQL Connection             */
/* ============================ */
db.connect((err) => {
  if (err) {
    console.log("❌ MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected");
});

/* ============================ */
/* START SERVER                 */
/* ============================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});