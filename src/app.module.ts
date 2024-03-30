import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/database/nestPrisma/prisma.module';
import { AuthModule } from './presentation/nest/modules/auth.module';
import { UsersModule } from './presentation/nest/modules/users.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
