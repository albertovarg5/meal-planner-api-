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

describe('Security tests', () => {

  test('User cannot register as trainer', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Hacker',
        email: 'hack@test.com',
        password: '123456',
        role: 'trainer'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.role).toBe('user'); // should NOT be trainer
  });

  test('Duplicate email should return 409', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        name: 'User1',
        email: 'user@test.com',
        password: '123456'
      });

    await request(app)
      .post('/auth/register')
      .send({
        name: 'User2',
        email: 'user2@test.com',
        password: '123456'
      });

    const login = await request(app)
      .post('/auth/login')
      .send({
        email: 'user2@test.com',
        password: '123456'
      });

    const token = login.body.token;

    const res = await request(app)
      .put('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'user@test.com'
      });

    expect(res.statusCode).toBe(409);
  });

});