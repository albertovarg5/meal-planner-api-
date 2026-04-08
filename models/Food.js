const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Food = sequelize.define('Food', {
  foodName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calories: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  protein: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  carbs: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  fats: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Food;