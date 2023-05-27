const mongoose = require("mongoose");

const forecastSchema = new mongoose.Schema(
  {
    city_name: {
      type: String,
      required: true,
    },
    city_id: {
      type: Number,
      required: true,
    },
    city_mongo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    humidity_time: {
      type: Date,
    },
    humidity_time_dt: {
      type: Number,
    },
    temp: {
      type: Number,
    },
    temp_min: {
      type: Number,
    },
    temp_max: {
      type: Number,
    },
  },
  { collection: "forecast" }
);

const Forecast = mongoose.model("Forecast", forecastSchema);

module.exports = Forecast;
