process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('RBAC tests', () => {
  test('Normal user cannot access trainer-only /users route', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Regular User',
        email: 'regular@example.com',
        password: '123456'
      });

    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'regular@example.com',
        password: '123456'
      });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
  });
});