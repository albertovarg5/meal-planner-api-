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
      name: 'Progress User',
      email: 'progress@example.com',
      password: '123456',
      role: 'user'
    });

  const loginRes = await request(app)
    .post('/auth/login')
    .send({
      email: 'progress@example.com',
      password: '123456'
    });

  token = loginRes.body.token;

  const mealRes = await request(app)
    .post('/meals')
    .set('Authorization', `Bearer ${token}`)
    .send({
      mealName: 'Lunch',
      date: '2026-04-06'
    });

  mealId = mealRes.body.meal.id;

  await request(app)
    .post(`/meals/${mealId}/foods`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      foodName: 'Rice',
      calories: 200,
      protein: 4,
      carbs: 44,
      fats: 1,
      quantity: '1 cup'
    });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Progress Routes', () => {
  test('GET /progress should return nutrition summary', async () => {
    const res = await request(app)
      .get('/progress')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.totalMeals).toBeDefined();
    expect(res.body.totalCalories).toBeDefined();
  });
});