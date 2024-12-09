const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const LoadRoutes = require("./src/routes/router");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/storage", express.static("storage"));

LoadRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
