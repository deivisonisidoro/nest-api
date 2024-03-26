import { Module } from '@nestjs/common';
import { AuthService } from '../../application/services/auth/implementations/Auth';
import { AuthController } from '../controllers/auth/Auth';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { AbstractUserService } from '../../application/services/user/User';
import { UserService } from '../../application/services/user/implementations/User';
import { AbstractAuthService } from '../../application/services/auth/Auth';
import { AbstractUserRepository } from '../../application/repositories/User';
import { PrismaUserRepository } from '../../infra/repositories/PrismaUser';
import { PrismaService } from '../../infra/database/prisma.service';
import { AbstractPasswordHasher } from '../../application/providers/PasswordHasher';
import { PasswordHasher } from '../../infra/providers/PasswordHasher';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth/auth.guard';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret:  process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    {
      provide: AbstractUserService,
      useClass: UserService
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AbstractAuthService,
      useClass: AuthService
    },
    {
      provide: AbstractUserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: AbstractPasswordHasher,
      useClass: PasswordHasher
    },
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
