import { Module } from '@nestjs/common';
import { UserService } from '../../application/service/implementations/User';
import { AbstractUserService } from '../../application/service/User';
import { UsersController } from '../controllers/User';
import { PrismaUserRepository } from '../repositories/PrismaUser';
import { AbstractUserRepository } from 'src/application/repositories/User';
import { PrismaService } from '../database/prisma.service';

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
    PrismaService
  ],
})
export class UsersModule {}
