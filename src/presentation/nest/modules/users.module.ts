import { Module } from '@nestjs/common';

import { UsersController } from '../controllers/user/User';
import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser';
import { AbstractUserRepository } from '../../../application/repositories/User';
import { PrismaService } from '../../../infra/database/nestPrisma/prisma.service';
import { AbstractPasswordHasher } from '../../../application/providers/PasswordHasher';
import { PasswordHasher } from '../../../infra/providers/PasswordHasher';
import { AbstractUserService } from '../../../application/services/User';
import { UserService } from '../services/User';

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
