import { Module } from '@nestjs/common';

import { AbstractPasswordHasher } from '../../../application/providers/PasswordHasher';
import { AbstractUserRepository } from '../../../application/repositories/User';
import { PrismaService } from '../../../infra/database/nestPrisma/prisma.service';
import { PasswordHasher } from '../../../infra/providers/PasswordHasher';
import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser';
import { UsersController } from '../controllers/user/User';
import { UserManager } from '../managers/implementations/User';
import { AbstractUserManager } from '../managers/User';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: AbstractUserManager,
      useClass: UserManager,
    },
    {
      provide: AbstractUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AbstractPasswordHasher,
      useClass: PasswordHasher,
    },
    PrismaService,
  ],
  imports: [],
})
export class UsersModule {}
