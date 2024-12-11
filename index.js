const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const LoadRoutes = require("./src/routes/router");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

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

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  module.exports = app;
}
