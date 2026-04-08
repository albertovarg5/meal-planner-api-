const express = require('express');
const { User, Meal, Food } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /users/profile
router.get('/profile', authMiddleware, async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});

// PUT /users/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (name) req.user.name = name;
    if (email) req.user.email = email;

    await req.user.save();

    res.json({
      message: 'Profile updated successfully.',
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /users
router.get('/', authMiddleware, roleMiddleware('trainer'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET /users/:id/meals
router.get('/:id/meals', authMiddleware, roleMiddleware('trainer'), async (req, res) => {
  try {
    const userMeals = await Meal.findAll({
      where: { userId: req.params.id },
      include: [{ model: Food }]
    });

    res.json(userMeals);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;