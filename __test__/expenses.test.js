/* eslint-disable no-console */
const request = require('supertest');
const {
  describe, expect, test, afterAll, beforeAll,
} = require('@jest/globals');
const connection = require('../database/connection');
const app = require('../app');

describe('The Expenses route', () => {
  describe('GET expenses endoint', () => {
  // The test that is being done
    test('should return 200', (done) => {
      request(app)
      // Endpoint that is being tested
        .get('/api/expenses')
      // Verify the expected result
        .expect(200)
      // Informing that the test is done
        .end(done);
    });
    test('should return 200 and valid JSON', async () => {
      const response = await request(app)
        .get('/api/expenses')
        .set('Accept', 'application/json');
      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
    });
    test('should return 1 expense', async () => {
      const response = await request(app)
        .get('/api/expenses/2')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(
        ({
          id: 2,
          amount: 20,
          category: 'grocery',
          shop: 'Prisma',
          created: '2023-01-07T21:04:35.000Z',
          updated: '2023-01-07T21:04:35.000Z',
        }),
      );
    });
    test('should return 404 and Not Found', async () => {
      const response = await request(app)
        .get('/api/expenses/101')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(404);
      expect(response.text).toContain('Not Found');
    });
  });
  describe('POST expenses endpoint', () => {
    let createdId;
    // beforeAll(() => {
    //   //
    // });
    test('should create a new expense with return 201', async () => {
      // make test POST
      const expense = {
        amount: 1000,
        category: 'Test category',
        shop: 'Test shop',
      };
      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
        // remember the created id for deleting it later
      createdId = response.body.id;
      expect(response.status).toEqual(201);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.id).toBeTruthy();
      expect(response.body.amount).toEqual(1000);
      expect(response.body.category).toEqual('Test category');
      expect(response.body.shop).toEqual('Test shop');
    });
    afterAll(async () => {
      await request(app)
        .delete(`/api/expenses/${createdId}`)
        .set('Accept', 'application/json');
    });
    test('should not allow negative amounts', async () => {
      const expense = {
        amount: -1,
      };
      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      expect(response.status).toEqual(400);
    });
    test('should not allow zero amounts', async () => {
      const expense = {
        amount: 0.00,
      };
      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      expect(response.status).toEqual(400);
    });
    test('should not allow string as amount', async () => {
      const expense = {
        amount: 'Test Amount',
      };
      const response = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      expect(response.status).toEqual(400);
      expect(response.text).toContain('"amount" must be a number');
    });
  });
  describe('DELETE expenses endpoint', () => {
    test('should delete the expense by id', async () => {
      // make test POST
      const expense = {
        amount: 100,
        shop: 'test shop',
      };
      const postResponse = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      const postId = postResponse.body.id;
      // DELETE test POST by id
      const response = await request(app)
        .delete(`/api/expenses/${postId}`)
        .set('Accept', 'application/json');
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('expense deleted');
    });
    test('should check that expense with id exists', async () => {
      const response = await request(app)
        .delete('/api/expenses/100')
        .set('Accept', 'application/json');
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Not Found');
    });
  });
  describe('PUT expenses endpoint', () => {
    let postId;
    beforeAll(async () => {
      const expense = {
        amount: '15.15',
        category: 'alcohol',
        shop: 'Test alcoholshop',
      };
      const postResponse = await request(app)
        .post('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      postId = postResponse.body.id;
    });

    test('should update the expense with the id', async () => {
      const expense = {
        id: postId,
        amount: 100,
        shop: 'Test shop',
        category: 'Test category',
      };
      const response = await request(app)
        .put('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(postId);
      expect(response.body.amount).toEqual(100);
      expect(response.body.shop).toEqual('Test shop');
      expect(response.body.category).toEqual('Test category');
    });

    test('should check that expense with id exists', async () => {
      const expense = {
        id: 1022,
        amount: '1500',
        shop: 'Test shop',
      };
      const response = await request(app)
        .put('/api/expenses')
        .set('Accept', 'application/json')
        .send(expense);
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Not Found');
    });

    afterAll(async () => {
      await request(app)
        .delete(`/api/expenses/${postId}`)
        .set('Accept', 'application/json');
    });
  });
  afterAll(async () => {
    connection.end();
  });
});
