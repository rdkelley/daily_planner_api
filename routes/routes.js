const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.post("/api/user", (req, res) => {
    // Create user in database
    db.User.create(req.body)
      .then(() => {
        return res.send(true);
      })
      .catch(error => {
        return res.status(500).send("Something went wrong.");
      });
  });
};
