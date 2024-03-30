import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './presentation/modules/users.module';
import { AuthModule } from './presentation/modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/database/prisma.module';
import { ErrorMiddleware } from './presentation/middlewares/ErrorMiddleware';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes('*');
  }
}
