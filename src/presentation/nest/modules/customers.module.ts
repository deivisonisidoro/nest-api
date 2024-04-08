import { Module } from '@nestjs/common';

import { AbstractPasswordHasher } from '../../../application/providers/PasswordHasher';
import { AbstractCustomerRepository } from '../../../application/repositories/Customer';
import { PrismaService } from '../../../infra/database/nestPrisma/prisma.service';
import { PasswordHasher } from '../../../infra/providers/PasswordHasher';
import { PrismaCustomerRepository } from '../../../infra/repositories/PrismaCustomer';
import { CustomersController } from '../controllers/customer/Customer';
import { CustomerManager } from '../managers/implementations/Customer';
import { AbstractCustomerManager } from '../managers/Customer';

@Module({
  controllers: [CustomersController],
  providers: [
    {
      provide: AbstractCustomerManager,
      useClass: CustomerManager,
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
  imports: [],
})
export class CustomersModule {}
