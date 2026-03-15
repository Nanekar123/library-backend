import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import db from "./src/config/db.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 5000;

/* ============================ */
/* Swagger Configuration        */
/* ============================ */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management System API",
      version: "1.0.0",
      description: "API documentation for Library Management System backend",
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

/* ============================ */
/* Swagger Route                */
/* ============================ */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  console.log(`📘 Swagger Docs: ${process.env.BASE_URL || `http://localhost:${PORT}`}/api-docs`);
});