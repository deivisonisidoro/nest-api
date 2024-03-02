import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service providing access to the Prisma client.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Initializes the Prisma client when the module is initialized.
   */
  async onModuleInit() {
    await this.$connect();
  }
}
