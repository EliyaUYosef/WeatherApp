const mongoose = require("mongoose");

const forecastSchema = new mongoose.Schema({
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  dt: {
    type: Date,
    // required: true,
  },
  temp: {
    type: Number,
    // required: true,
  },
  temp_min: {
    type: Number,
    // required: true,
  },
  temp_max: {
    type: Number,
    // required: true,
  },
  humidity: {
    type: Number,
    // required: true,
  },
});

const Forecast = mongoose.model("Forecast", forecastSchema);

module.exports = Forecast;
