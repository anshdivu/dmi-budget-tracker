const Sequelize = require("sequelize");
const sequelize = require("../lib/dbConnection");

module.exports = sequelize.define("person", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING
});
