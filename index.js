const express = require("express");
const helmet = require("helmet");
const bearerToken = require("express-bearer-token");

const app = express();

app.use(bearerToken());

// Helmet adds some common security-related HTTP headers.
app.use(helmet());

const db = require("./models");

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
// app.use(express.static("public"));

require("./routes/routes")(app);

const PORT = process.env.PORT || 8080;

db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
