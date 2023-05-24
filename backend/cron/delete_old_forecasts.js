const cron = require("node-cron");
const db = require("../config/mongo");

function start() {
  const cron_interval = CRONS_INTERVAL;
  cron.schedule(`0 */${cron_interval} * * *`, async () => {
    console.log("Running |DELETE| cron job...");

    try {
      // Remove documents where 'dt' is smaller than the current timestamp
      const currentTimestamp = Math.floor(Date.now() / 1000);
      await db
        .collection("forecast")
        .deleteMany({ dt: { $lt: currentTimestamp } });

      console.log("Cron job |DELETE| completed successfully.");
    } catch (error) {
      console.error("Error running cron job:");
      console.error(error);
    }
  });
}

module.exports = { start };
