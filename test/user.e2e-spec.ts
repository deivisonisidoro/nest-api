/**
 * @fileoverview End-to-end (E2E) tests for UserController.
 */

import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { PrismaService } from '../src/infra/database/prisma.service';
import { AppModule } from '../src/app.module';
import { UserErrorMessageEnum } from '../src/domain/enums/user/ErrorMessage';
import { User } from '../src/domain/entities/User';

/**
 * Describe block for UserController E2E tests.
 */
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createdUserId: string;
  let accessToken: string;

  const userData = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
  };

  /**
   * Sets up the testing environment before each describe block.
   */
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    await prisma.cleanDatabase();

    app = moduleRef.createNestApplication();
    await app.init();
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(HttpStatus.CREATED);

    createdUserId = response.body.id;
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: userData.email, password: userData.password })
      .expect(HttpStatus.OK);

    accessToken = loginResponse.body.access_token;
  });
  afterAll(async () => {
    await app.close();
  });
  /**
   * Describe block for testing user creation functionality.
   */
  describe('Create User', () => {
    /**
     * Test case to verify the ability to create a new user.
     */
    it('should be able to create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'newUser@example.com',
          password: 'password',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(HttpStatus.CREATED);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('id');
    });

    /**
     * Test case to verify that it's not possible to create an existing user.
     */
    it('should not be able to create an existing user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userData);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toBe(UserErrorMessageEnum.UserAlreadyExists);
    });
  });

  /**
   * Describe block for testing user update functionality.
   */
  describe('Update User', () => {
    /**
     * Test case to verify the ability to update the password of an existing user.
     */
    it('Should be able to update password of an existing user', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${createdUserId}`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({
          ...userData,
          password: '123',
        });

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify that it's not possible to update a non-existing user.
     */
    it('Should not be able to update an not existing user', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/:id')
        .set('Authorization', 'Bearer ' + accessToken)
        .send({
          email: 'testUpdatedExisting@test.com.br',
        });

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  /**
   * Describe block for testing user retrieval functionality.
   */
  describe('Retrieve User', () => {
    /**
     * Test case to verify the ability to get a list of users.
     */
    it('Should be able to get a list of users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify the ability to get a user.
     */
    it('Should be able to get user', async () => {

      const response = await request(app.getHttpServer())
        .get(`/users/${createdUserId}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify that it's not possible to get a user.
     */
    it('Should not be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/:id`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  /**
   * Describe block for testing user deletion functionality.
   */
  describe('Delete User', () => {
    /**
     * Test case to verify the ability to delete an existing user.
     */
    it('Should be able to delete an existing user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${createdUserId}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify that it's not possible to delete an existing user when userId is wrong.
     */
    it('Should not be able to delete an existing user when userId is wrong', async () => {
      const response = await request(app.getHttpServer())
        .delete('/users/testID')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
