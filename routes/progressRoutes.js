const express = require('express');
const { Meal, Food } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

async function calculateSummaryForUser(userId) {
  const meals = await Meal.findAll({
    where: { userId }
  });

  let totalMeals = meals.length;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  for (const meal of meals) {
    const foods = await Food.findAll({
      where: { mealId: meal.id }
    });

    for (const food of foods) {
      totalCalories += Number(food.calories || 0);
      totalProtein += Number(food.protein || 0);
      totalCarbs += Number(food.carbs || 0);
      totalFats += Number(food.fats || 0);
    }
  }

  return {
    totalMeals,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFats
  };
}

// GET /progress
router.get('/', authMiddleware, async (req, res) => {
  try {
    const summary = await calculateSummaryForUser(req.user.id);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /progress/:userId
router.get('/:userId', authMiddleware, roleMiddleware('trainer'), async (req, res) => {
  try {
    const summary = await calculateSummaryForUser(req.params.userId);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;