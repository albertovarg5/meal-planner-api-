const express = require('express');
const { Meal, Food } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

async function updateMealCalories(mealId) {
  const foods = await Food.findAll({ where: { mealId } });
  const totalCalories = foods.reduce((sum, food) => sum + Number(food.calories), 0);

  await Meal.update({ totalCalories }, { where: { id: mealId } });
}

// GET /meals
router.get('/', authMiddleware, async (req, res) => {
  try {
    let meals;

    if (req.user.role === 'trainer') {
      meals = await Meal.findAll({ include: [Food] });
    } else {
      meals = await Meal.findAll({
        where: { userId: req.user.id },
        include: [Food]
      });
    }

    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /meals/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id, { include: [Food] });

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    if (req.user.role !== 'trainer' && meal.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// POST /meals
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { mealName, date } = req.body;

    if (!mealName || !date) {
      return res.status(400).json({ message: 'mealName and date are required.' });
    }

    const meal = await Meal.create({
      mealName,
      date,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Meal created successfully.',
      meal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PUT /meals/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    if (meal.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own meals.' });
    }

    const { mealName, date } = req.body;

    if (mealName) meal.mealName = mealName;
    if (date) meal.date = date;

    await meal.save();

    res.json({
      message: 'Meal updated successfully.',
      meal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /meals/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    if (meal.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own meals.' });
    }

    await meal.destroy();

    res.json({ message: 'Meal deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// POST /meals/:id/foods
router.post('/:id/foods', authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    if (meal.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only add foods to your own meals.' });
    }

    const { foodName, calories, protein, carbs, fats, quantity } = req.body;

    if (!foodName || calories == null || !quantity) {
      return res.status(400).json({
        message: 'foodName, calories, and quantity are required.'
      });
    }

    const food = await Food.create({
      foodName,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      quantity,
      mealId: meal.id
    });

    await updateMealCalories(meal.id);

    res.status(201).json({
      message: 'Food added successfully.',
      food
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PUT /meals/foods/:foodId
router.put('/foods/:foodId', authMiddleware, async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found.' });
    }

    const meal = await Meal.findByPk(food.mealId);
    if (meal.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update food in your own meals.' });
    }

    const { foodName, calories, protein, carbs, fats, quantity } = req.body;

    if (foodName) food.foodName = foodName;
    if (calories != null) food.calories = calories;
    if (protein != null) food.protein = protein;
    if (carbs != null) food.carbs = carbs;
    if (fats != null) food.fats = fats;
    if (quantity) food.quantity = quantity;

    await food.save();
    await updateMealCalories(meal.id);

    res.json({
      message: 'Food updated successfully.',
      food
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /meals/foods/:foodId
router.delete('/foods/:foodId', authMiddleware, async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found.' });
    }

    const meal = await Meal.findByPk(food.mealId);
    if (meal.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete food from your own meals.' });
    }

    await food.destroy();
    await updateMealCalories(meal.id);

    res.json({ message: 'Food deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;