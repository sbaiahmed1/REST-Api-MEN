const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session");

// create express app
const app = express();
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
//enabling cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
/////////////////////////////////////////////////////////////////////

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to my application. Take notes quickly. Organize and keep track of all your notes.",
  });
});
////////////////////////////////////////////
require("./app/routes/event.routes")(app);
require("./app/routes/task.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/transaction.routes.js")(app);
require("./app/routes/poll.routes.js")(app);
// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
