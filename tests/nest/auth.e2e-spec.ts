import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { PrismaService } from '../../src/infra/database/nestPrisma/prisma.service';
import { AppModule } from '../../src/presentation/nest/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const customerData = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'Customer',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = module.get(PrismaService);
    await prisma.cleanDatabase();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should sign in a customer', async () => {
    await request(app.getHttpServer()).post('/customers').send(customerData);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: customerData.email,
        password: customerData.password,
      })
      .expect(HttpStatus.OK);
  });

  it('should not able to sign in a customer', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test',
        password: 'test',
      });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should be able to return information of customer', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: customerData.email,
        password: customerData.password,
      });
    const token = loginReq.body.access_token;

    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + token)
      .send({
        email: 'test',
        password: 'test',
      });

    expect(response.status).toBe(HttpStatus.OK);
  });

  it('should not be able to return information of customer', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test',
        password: 'test',
      });
    const token = loginReq.body.access_token;

    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + token)
      .send({
        email: 'test',
        password: 'test',
      });

    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });
});
