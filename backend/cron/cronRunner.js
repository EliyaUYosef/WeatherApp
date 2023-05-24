const cron = require("node-cron");
const my_cron = require("./my_cron");
const delete_old_forecasts = require("./delete_old_forecasts");

const cronRunner = () => {
  // Start cron jobs
  my_cron.start();
  delete_old_forecasts.start();
};
module.exports = cronRunner;
