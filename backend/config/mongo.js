const mongoose = require("mongoose");
require("dotenv").config();

const dbName = "WeatherApp";
const uri = process.env.MONGO_URI;

const dbOptions = {
  dbName: dbName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   createIndexes: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
};

mongoose.connect(uri, dbOptions);

mongoose.connection.on("connected", () => {
  console.log(
    GREEN + LINE + "Connected to MongoDB database : " + dbName + LINE + RESET
  );
});

mongoose.connection.on("error", (err) => {
  console.log("\x1b[31mMongoDB connection error: \x1b[0m", err);
});

module.exports = mongoose.connection;
