const express = require("express");
const helmet = require("helmet");
const bearerToken = require("express-bearer-token");
const cors = require("cors");

const app = express();

// Helmet adds some common security-related HTTP headers.
app.use(helmet());

// CORS is added to allow requests from outside domains (cross-origin requests)
app.use(cors());

// Attaches the contents of the incoming Authorization header to req.token
app.use(bearerToken());

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
