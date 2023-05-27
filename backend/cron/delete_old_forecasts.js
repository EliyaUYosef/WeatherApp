const cron = require("node-cron");
const db = require("../config/mongo");
start();
function start() {
  const cron_interval = CRONS_INTERVAL;

  // cron.schedule(`*/${cron_interval} * * * * *`, async () => {
  cron.schedule(`0 */${cron_interval} * * *`, async () => {
    console.log("Running |DELETE| cron job...");

    try {
      // Remove documents where 'dt' is smaller than the current timestamp
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const result = await db
        .collection("forecast")
        .deleteMany({ humidity_time_dt: { $lt: currentTimestamp } });
      // console.log(result);
      if (result.deletedCount)
        console.log(
          "Cron job |DELETE| completed successfully." +
            result.deletedCount +
            " rows deleted successfully."
        );
    } catch (error) {
      console.error("Error running cron job:");
      console.error(error);
    }
  });
}

module.exports = { start };
