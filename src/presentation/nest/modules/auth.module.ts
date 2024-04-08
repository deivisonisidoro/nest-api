import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AbstractPasswordHasher } from '../../../application/providers/PasswordHasher';
import { AbstractCustomerRepository } from '../../../application/repositories/Customer';
import { PrismaService } from '../../../infra/database/nestPrisma/prisma.service';
import { PasswordHasher } from '../../../infra/providers/PasswordHasher';
import { PrismaCustomerRepository } from '../../../infra/repositories/PrismaCustomer';
import { AuthController } from '../controllers/auth/Auth';
import { AuthGuard } from '../guards/auth/auth.guard';
import { AbstractAuthManager } from '../managers/Auth';
import { AbstractCustomerManager } from '../managers/Customer';
import { AuthManager } from '../managers/implementations/Auth';
import { CustomerManager } from '../managers/implementations/Customer';
import { CustomersModule } from './customers.module';

@Module({
  imports: [
    CustomersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    {
      provide: AbstractCustomerManager,
      useClass: CustomerManager,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AbstractAuthManager,
      useClass: AuthManager,
    },
    {
      provide: AbstractCustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: AbstractPasswordHasher,
      useClass: PasswordHasher,
    },
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
