const express = require("express");
const router = express.Router();
const cityController = require("./controller");

// Define routes for cities
router.get("/", (req, res, next) => {
  const clientIP = req.ip;
  const userAgent = req.get("user-agent");

  console.log("Client IP:", clientIP);
  console.log("User Agent:", userAgent);

  next();
});

router.get("/:cityId", cityController.getWeatherData);
router.get("/", cityController.getAllCitiesWithParams);
router.get("/currentDetails/:cityId", cityController.getCurrentDetailsForCity);

module.exports = router;
