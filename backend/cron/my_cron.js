const cron = require("node-cron");
const db = require("../config/mongo");
const City = require("../models/city");
const { fetchWeatherData } = require("../controllers/city");

function start() {
  const interval = CRONS_INTERVAL;
  cron.schedule(`0 */${interval} * * *`, async () => {
    console.log("Running |UPLOAD| cron job...");

    try {
      // Retrieve all cities from the database
      const cities = await City.find().exec();

      // Call fetchWeatherData for each city
      for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const city_api = await fetchWeatherData(city);

        // Create a new document in the 'forecast' collection
        city_api.forEach(async (city_api_object) => {
          const { humidity_time_dt, city_id } = city_api_object;

          // Check if the document already exists in the 'forecast' collection
          const existingDocument = await db.collection("forecast").findOne(
            {
              humidity_time_dt,
              city_id,
            },
            { projection: { _id: 1 } }
          );

          // If the document exists, `existingDocument` will have a value
          const documentExists = !!existingDocument;

          if (documentExists) {
            // Document already exists, handle the case accordingly
            // console.log("Document already exists in the collection");
          } else {
            // Document doesn't exist, proceed with inserting it
            await db.collection("forecast").insertOne(city_api_object);
          }
        });
      }
    } catch (error) {
      console.error("Error retrieving cities from the database");
      // console.error(error);
    }

    console.log("upload cron |UPLOAD| DONE");
  });
}

module.exports = { start };
