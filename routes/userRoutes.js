const express = require('express');
const { User, Meal, Food } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /users/profile
router.get('/profile', authMiddleware, async (req, res) => {
  return res.status(200).json({
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

    return res.status(200).json({
      message: 'Profile updated successfully.',
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: 'Email already in use.'
      });
    }

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation error.',
        errors: error.errors.map((e) => e.message)
      });
    }

    return res.status(500).json({
      message: 'Server error.',
      error: error.message
    });
  }
});

// GET /users
router.get('/', authMiddleware, roleMiddleware('trainer'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role']
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error.',
      error: error.message
    });
  }
});

// GET /users/:id/meals
router.get('/:id/meals', authMiddleware, roleMiddleware('trainer'), async (req, res) => {
  try {
    const userMeals = await Meal.findAll({
      where: { userId: req.params.id },
      include: [{ model: Food }]
    });

    return res.status(200).json(userMeals);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error.',
      error: error.message
    });
  }
});

module.exports = router;