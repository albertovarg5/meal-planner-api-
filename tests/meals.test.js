process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

let token;
let mealId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app)
    .post('/auth/register')
    .send({
      name: 'Meal User',
      email: 'mealuser@example.com',
      password: '123456',
      role: 'user'
    });

  const loginRes = await request(app)
    .post('/auth/login')
    .send({
      email: 'mealuser@example.com',
      password: '123456'
    });

  token = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Meal Routes', () => {
  test('POST /meals should create a meal', async () => {
    const res = await request(app)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mealName: 'Breakfast',
        date: '2026-04-06'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.meal.mealName).toBe('Breakfast');
    mealId = res.body.meal.id;
  });

  test('GET /meals should return meals', async () => {
    const res = await request(app)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /meals/:id/foods should add food to a meal', async () => {
    const res = await request(app)
      .post(`/meals/${mealId}/foods`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        foodName: 'Chicken',
        calories: 250,
        protein: 35,
        carbs: 0,
        fats: 5,
        quantity: '200g'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.food.foodName).toBe('Chicken');
  });
});