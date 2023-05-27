const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    city_id: {
      type: Number,
      required: true,
      unique: true,
    },
    city_name: {
      type: String,
    },
    city_timeZone: {
      type: Number,
    },
    city_subtitle: {
      type: String,
    },
    city_latitude: {
      type: Number,
      required: true,
    },
    city_longitude: {
      type: Number,
      required: true,
    },
    important_city: {
      type: Boolean,
    },
  },
  { collection: "city" }
);

const City = mongoose.model("City", citySchema);

module.exports = City;
