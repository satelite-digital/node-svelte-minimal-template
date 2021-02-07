const Sequelize = require('sequelize')
const sequelize = require('../sequelize.js')

const  = sequelize.define('', {
  text: {
    type: Sequelize.String,
  },
  text: {
    type: Sequelize.Boolean,
    defaultValue: &quot;false&quot;
  },
  text: {
    type: Sequelize.Json,
    allowNull: false,
  }
});

.sync()

module.exports = ;