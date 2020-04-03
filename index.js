const express = require("express");

const app = express();

const db = require('./models');

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
// app.use(express.static("public"));

require("./routes/routes")(app);

const PORT = process.env.PORT || 8080;

db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
