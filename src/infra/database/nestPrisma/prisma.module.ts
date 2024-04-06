import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Module for providing the Prisma service globally.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
