const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    city_id: {
      type: Number,
      // required: true,
      unique: true,
    },
    city_name: {
      type: String,
      // required: true,
    },
    city_timeZone: {
      type: String,
      // required: true,
    },
    city_latitude: {
      type: Number,
      // required: true,
    },
    city_longitude: {
      type: Number,
      // required: true,
    },
  },
  { collection: "city" }
);

const City = mongoose.model("City", citySchema);

module.exports = City;
