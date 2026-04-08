const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Meal = sequelize.define('Meal', {
  mealName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalCalories: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

module.exports = Meal;