const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
  it('should login and return token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@email.com',
        password: '123456'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
