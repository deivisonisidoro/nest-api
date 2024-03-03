import { Module } from '@nestjs/common';
import { AuthService } from '../../application/services/auth/implementations/Auth';
import { AuthController } from '../controllers/auth/Auth';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { AbstractUserService } from 'src/application/services/user/User';
import { UserService } from 'src/application/services/user/implementations/User';
import { AbstractAuthService } from 'src/application/services/auth/Auth';
import { AbstractUserRepository } from 'src/application/repositories/User';
import { PrismaUserRepository } from 'src/infra/repositories/PrismaUser';
import { PrismaService } from 'src/infra/database/prisma.service';
import { AbstractPasswordHasher } from 'src/application/providers/password-hasher';
import { PasswordHasher } from 'src/infra/providers/password-hasher';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret:  process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    {
      provide: AbstractUserService,
      useClass: UserService
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
    PrismaService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
