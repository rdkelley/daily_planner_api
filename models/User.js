const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
  });

  User.associate = function (models) {
    // When an User is deleted, also delete any associated Tasks
    User.hasMany(models.Task, {
      onDelete: "cascade",
    });
  };

  // Before user saves to database, hash password
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
  });

  return User;
};
