require("dotenv").config();
require("./config/constants");
// const db = require("./config/db");
const db = require("./config/mongo");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cronRunner = require("./cron/cronRunner");
const cors = require("cors");

// Routes
const cityRoutes = require("./router");
const { request } = require("http");

// Middleware
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
app.use("/", (req, res, next) => {
  console.log(YELLOW + LINE + "REQUEST" + LINE + RESET);
  next();
});
// Use routes
app.use("/api/cities", cityRoutes);
app.use("/api/weather", cityRoutes);

cronRunner();

const port = process.env.APP_PORT ?? 3030;
// Start the server
app.listen(port, () => {
  console.log(
    GREEN + LINE + "Server is running on port : " + port + LINE + RESET
  );
});
