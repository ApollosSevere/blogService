const { Sequelize, DataTypes } = require("sequelize");

const db = require("../db");

const User = db.define("post", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    validate: {
      isSpecificLength(value) {
        if (value.length > 3) {
          throw new Error("industryOfFocus must only have three items");
        }
      },
    },
  },
  author_name: {
    type: Sequelize.STRING,
  },
  img: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
