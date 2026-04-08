require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User, Meal, Food } = require('./models');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('password123', 10);

    const user1 = await User.create({
      name: 'Alberto User',
      email: 'user@test.com',
      password: hashedPassword,
      role: 'user'
    });

    const user2 = await User.create({
      name: 'Maria User',
      email: 'maria@test.com',
      password: hashedPassword,
      role: 'user'
    });

    const trainer = await User.create({
      name: 'Carlos Trainer',
      email: 'trainer@test.com',
      password: hashedPassword,
      role: 'trainer'
    });

    const breakfast = await Meal.create({
      mealName: 'Breakfast',
      date: '2026-04-06',
      totalCalories: 0,
      userId: user1.id
    });

    const lunch = await Meal.create({
      mealName: 'Lunch',
      date: '2026-04-06',
      totalCalories: 0,
      userId: user1.id
    });

    const dinner = await Meal.create({
      mealName: 'Dinner',
      date: '2026-04-07',
      totalCalories: 0,
      userId: user2.id
    });

    await Food.bulkCreate([
      {
        foodName: 'Eggs',
        calories: 140,
        protein: 12,
        carbs: 1,
        fats: 10,
        quantity: '2 eggs',
        mealId: breakfast.id
      },
      {
        foodName: 'Oatmeal',
        calories: 150,
        protein: 5,
        carbs: 27,
        fats: 3,
        quantity: '1 bowl',
        mealId: breakfast.id
      },
      {
        foodName: 'Chicken Breast',
        calories: 250,
        protein: 35,
        carbs: 0,
        fats: 5,
        quantity: '200g',
        mealId: lunch.id
      },
      {
        foodName: 'Rice',
        calories: 200,
        protein: 4,
        carbs: 44,
        fats: 1,
        quantity: '1 cup',
        mealId: lunch.id
      },
      {
        foodName: 'Salmon',
        calories: 300,
        protein: 34,
        carbs: 0,
        fats: 18,
        quantity: '180g',
        mealId: dinner.id
      },
      {
        foodName: 'Vegetables',
        calories: 80,
        protein: 3,
        carbs: 12,
        fats: 1,
        quantity: '1 plate',
        mealId: dinner.id
      }
    ]);

    const meals = await Meal.findAll();

    for (const meal of meals) {
      const foods = await Food.findAll({
        where: { mealId: meal.id }
      });

      const totalCalories = foods.reduce((sum, food) => {
        return sum + Number(food.calories || 0);
      }, 0);

      await meal.update({ totalCalories });
    }

    console.log('Database seeded successfully.');
    console.log('User login: user@test.com / password123');
    console.log('Trainer login: trainer@test.com / password123');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();