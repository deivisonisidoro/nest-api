import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LoginRequestDTO } from '../src/domain/dtos/auth/Login';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/infra/database/prisma.service';



describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const signInDto: LoginRequestDTO = {
    email: 'test@example.com',
    password: 'password',
  };
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
});
