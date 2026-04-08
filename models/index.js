const sequelize = require('../config/database');
const User = require('./User');
const Meal = require('./Meal');
const Food = require('./Food');

User.hasMany(Meal, { foreignKey: 'userId', onDelete: 'CASCADE' });
Meal.belongsTo(User, { foreignKey: 'userId' });

Meal.hasMany(Food, { foreignKey: 'mealId', onDelete: 'CASCADE' });
Food.belongsTo(Meal, { foreignKey: 'mealId' });

module.exports = {
  sequelize,
  User,
  Meal,
  Food
};