const mysql = require("mysql");

const connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

function executeQuery(query, callback) {
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return;
    }
    callback(results);
  });
}

function disconnectFromDB() {
  connection.end((err) => {
    if (err) {
      console.error("Error disconnecting from MySQL:", err);
      return;
    }
    console.log("Disconnected from MySQL");
  });
}

module.exports = {
  executeQuery,
  disconnectFromDB,
  connection,
};
