import { Module } from '@nestjs/common';
import { UsersModule } from './presentation/modules/users.module';
import { AuthModule } from './presentation/modules/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
