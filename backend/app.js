require("dotenv").config();
require("./config/constants");
// const db = require("./config/db");
const db = require("./config/mongo");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cronRunner = require("./cron/cronRunner");

// Routes
const cityRoutes = require("./routes/city");
const { request } = require("http");

// Middleware
app.use(express.json());

// Use routes
app.use("/api/cities", cityRoutes);
cronRunner();

const port = process.env.APP_PORT ?? 3030;
// Start the server
app.listen(port, () => {
  console.log(
    GREEN + LINE + "Server is running on port : " + port + LINE + RESET
  );
});
