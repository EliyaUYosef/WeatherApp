const express = require("express");
const router = express.Router();
const cityController = require("../controllers/city");

// Define routes for cities
router.get("/", (req, res, next) => {
  const clientIP = req.ip;
  const userAgent = req.get("user-agent");

  // console.log("Client IP:", clientIP);
  // console.log("User Agent:", userAgent);

  next(); // Pass control to the next route handler
});
router.get("/", cityController.getAllCities);

module.exports = router;
