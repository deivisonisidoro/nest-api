import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * Service providing access to the Prisma client.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL'),
        },
      },
    });
  }
  /**
   * Initializes the Prisma client when the module is initialized.
   */
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;
    const models = Reflect.ownKeys(this).filter(
      (key) => key[0] !== '_' && key[0] !== '$' && /^[A-Z]/.test(key[0]),
    );

    return Promise.all(
      models.map((modelKey) => (this as any)[modelKey].deleteMany()),
    );
  }
}
