import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { AbstractPasswordHasher } from "../../../application/providers/PasswordHasher";
import { AbstractUserRepository } from "../../../application/repositories/User";
import { PrismaService } from "../../../infra/database/nestPrisma/prisma.service";
import { PasswordHasher } from "../../../infra/providers/PasswordHasher";
import { PrismaUserRepository } from "../../../infra/repositories/PrismaUser";
import { AuthController } from "../controllers/auth/Auth";
import { AbstractAuthManager } from "../managers/Auth";
import { AbstractUserManager } from "../managers/User";
import { AuthManager } from "../managers/implementations/Auth";
import { UserManager } from "../managers/implementations/User";
import { UsersModule } from "./users.module";
import { AuthGuard } from "../guards/auth/auth.guard";



@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret:  process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    {
      provide: AbstractUserManager,
      useClass: UserManager
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AbstractAuthManager,
      useClass: AuthManager
    },
    {
      provide: AbstractUserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: AbstractPasswordHasher,
      useClass: PasswordHasher
    },
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
