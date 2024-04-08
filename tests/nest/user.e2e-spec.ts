/**
 * @fileoverview End-to-end (E2E) tests for CustomerController.
 */

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { CustomerErrorMessageEnum } from '../../src/domain/enums/customer/ErrorMessage';
import { PrismaService } from '../../src/infra/database/nestPrisma/prisma.service';
import { AppModule } from '../../src/presentation/nest/app.module';

/**
 * Describe block for CustomerController E2E tests.
 */
describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createdCustomerId: string;
  let accessToken: string;

  const customerData = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'Customer',
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
      .post('/customers')
      .send(customerData)
      .expect(HttpStatus.CREATED);

    createdCustomerId = response.body.id;
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: customerData.email, password: customerData.password })
      .expect(HttpStatus.OK);

    accessToken = loginResponse.body.access_token;
  });
  afterAll(async () => {
    await app.close();
  });
  /**
   * Describe block for testing customer creation functionality.
   */
  describe('Create Customer', () => {
    /**
     * Test case to verify the ability to create a new customer.
     */
    it('should be able to create a new customer', async () => {
      const response = await request(app.getHttpServer())
        .post('/customers')
        .send({
          email: 'newCustomer@example.com',
          password: 'password',
          firstName: 'Test',
          lastName: 'Customer',
        })
        .expect(HttpStatus.CREATED);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('id');
    });

    /**
     * Test case to verify that it's not possible to create an existing customer.
     */
    it('should not be able to create an existing customer', async () => {
      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(customerData);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toBe(
        CustomerErrorMessageEnum.CustomerAlreadyExists,
      );
    });
  });

  /**
   * Describe block for testing customer update functionality.
   */
  describe('Update Customer', () => {
    /**
     * Test case to verify the ability to update the password of an existing customer.
     */
    it('Should be able to update password of an existing customer', async () => {
      const response = await request(app.getHttpServer())
        .put(`/customers/${createdCustomerId}`)
        .set('Authorization', 'Bearer ' + accessToken)
        .send({
          ...customerData,
          password: '123',
        });

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify that it's not possible to update a non-existing customer.
     */
    it('Should not be able to update an not existing customer', async () => {
      const response = await request(app.getHttpServer())
        .patch('/customers/:id')
        .set('Authorization', 'Bearer ' + accessToken)
        .send({
          email: 'testUpdatedExisting@test.com.br',
        });

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  /**
   * Describe block for testing customer retrieval functionality.
   */
  describe('Retrieve Customer', () => {
    /**
     * Test case to verify the ability to get a list of customers.
     */
    it('Should be able to get a list of customers', async () => {
      const response = await request(app.getHttpServer())
        .get('/customers')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify the ability to get a list of customers with query parameters.
     */
    it('Should be able to get a list of customers with query parameters', async () => {
      const response = await request(app.getHttpServer())
        .get('/customers')
        .query({
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
        })
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveLength(1); // Assuming one customer matches the query parameters
    });

    /**
     * Test case to verify that no customers are found when using query parameters that don't match any customers.
     */
    it('Should not find any customers when using non-matching query parameters', async () => {
      const response = await request(app.getHttpServer())
        .get('/customers')
        .query({
          firstName: 'Nonexistent',
          lastName: 'Customer',
          email: 'nonexistent.customer@example.com',
        })
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
      expect(response.body.message).toBe(
        CustomerErrorMessageEnum.CustomerNotFound,
      );
    });

    /**
     * Test case to verify the ability to get a customer.
     */
    it('Should be able to get customer', async () => {
      const response = await request(app.getHttpServer())
        .get(`/customers/${createdCustomerId}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify that it's not possible to get a customer.
     */
    it('Should not be able to get customer', async () => {
      const response = await request(app.getHttpServer())
        .get(`/customers/:id`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  /**
   * Describe block for testing customer deletion functionality.
   */
  describe('Delete Customer', () => {
    /**
     * Test case to verify the ability to delete an existing customer.
     */
    it('Should be able to delete an existing customer', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/customers/${createdCustomerId}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.OK);
    });

    /**
     * Test case to verify that it's not possible to delete an existing customer when customerId is wrong.
     */
    it('Should not be able to delete an existing customer when customerId is wrong', async () => {
      const response = await request(app.getHttpServer())
        .delete('/customers/testID')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
