process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');
const { sequelize, User } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Routes', () => {
  test('POST /auth/register should create a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: '123456',
        role: 'user'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('testuser@example.com');
  });

  test('POST /auth/login should return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});