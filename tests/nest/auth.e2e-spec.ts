import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/database/nestPrisma/prisma.service';



describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const userData = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
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

  it('should sign in a user', async () => {
    await request(app.getHttpServer())
        .post('/users')
        .send(userData);
    
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      })
      .expect(HttpStatus.OK);
  });
  
  it('should not able to sign in a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: "test",
        password: "test"
      })
      
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  
  it('should be able to return information of user', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      })
      const token  = loginReq.body.access_token
      
      const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + token)
      .send({
        email: "test",
        password: "test"
      })
      
    expect(response.status).toBe(HttpStatus.OK);
  });
  
  it('should not be able to return information of user', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: "test",
        password: "test"
      })
      const token  = loginReq.body.access_token

      const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + token)
      .send({
        email: "test",
        password: "test"
      })
      
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });
});
