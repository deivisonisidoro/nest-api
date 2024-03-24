import { Module } from '@nestjs/common';
import { UsersModule } from './presentation/modules/users.module';
import { AuthModule } from './presentation/modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/database/prisma.module';

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
