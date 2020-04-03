const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.post("/api/user", (req, res) => {
    console.log("Hello, this is POST /user");

    db.User.create(req.body)
      .then(() => {
        return res.send(true);
      })
      .catch(error => {
        return res.status(500).send("Something went wrong.");
      });
  });
};
