module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
  });

  return Task;
};
