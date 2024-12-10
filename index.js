const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const LoadRoutes = require("./src/routes/router");

dotenv.config();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow your frontend's URL
    credentials: true, // Allow cookies and Authorization headers
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Handle preflight requests
app.options("*", cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieparser());

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/storage", express.static("storage"));

LoadRoutes(app);

// Export the app for Vercel
module.exports = app;
