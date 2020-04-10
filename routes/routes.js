const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

require("dotenv").config();

const checkJwt = (req, res, next) => {
  try {
    var decoded = jwt.decode(req.token, process.env.JWT_SECRET);
  } catch (error) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }

  req.user = decoded;

  next();
};

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.post("/api/user", (req, res, next) => {
    // Create user in database
    db.User.create(req.body)
      .then(() => {
        return res.send(true);
      })
      .catch(() => {
        return next({
          status: 503,
          message: "Error creating user",
        });
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
      // If no user, return 406 error
      if (!user) {
        return res.status(406).send("User not found.");
      }

      // Compare hashed, attempted PW with PW in database
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err);

          return res.status(500).send("Service unavailable");
        }

        // If no match, return 401 error
        if (!result) {
          return res.status(401).send("Unauthorized");
        }

        // If match, generate JWT
        return res.send({
          token: jwt.encode({ userId: user.id }, process.env.JWT_SECRET),
        });
      });
    });
  });

  app.get("/api/tasks", checkJwt, (req, res) => {
    console.log(req.user);

    res.send("Here are your tasks");
  });

  // eslint-disable-next-line no-unused-vars
  app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status && err.message) {
      return res.status(err.status).send(err.message);
    }

    return res.status(500).send("That didn't work.");
  });
};
