const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.post("/api/user", (req, res) => {
    // Create user in database
    db.User.create(req.body)
      .then(() => {
        return res.send(true);
      })
      .catch((error) => {
        return res.status(500).send("Something went wrong.");
      });
  });

  app.post("/api/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(406).send("Missing email or password.");
    }

    // Check to see if the user exists
    db.User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (!user) {
        return res.status(406).send("User not found.");
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err);

          return res.status(500).send("Service unavailable");
        }

        if (!result) {
          return res.status(401).send("Unauthorized");
        }

        return res.send({
          jwt: "JWT GOES HERE",
        });
      });
    });

    // If the user does exist, hash the attempted password

    // Compare attempted PW with PW in database

    // If match, generate JWT

    // Else, return a 401 (Unauthorized) error
  });
};
