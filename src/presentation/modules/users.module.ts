import { Module } from '@nestjs/common';
import { UserService } from '../../application/services/user/implementations/User';
import { AbstractUserService } from '../../application/services/user/User';
import { UsersController } from '../controllers/user/User';
import { PrismaUserRepository } from '../../infra/repositories/PrismaUser';
import { AbstractUserRepository } from '../../application/repositories/User';
import { PrismaService } from '../../infra/database/prisma.service';
import { AbstractPasswordHasher } from 'src/application/providers/password-hasher';
import { PasswordHasher } from 'src/infra/providers/password-hasher';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: AbstractUserService,
      useClass: UserService
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
  imports: [],
})
export class UsersModule {}
