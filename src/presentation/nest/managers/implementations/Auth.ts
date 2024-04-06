import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AbstractPasswordHasher } from '../../../../application/providers/PasswordHasher';
import { AbstractUserRepository } from '../../../../application/repositories/User';
import { LoginResponse } from '../../../../application/useCases/auth/signIn/AbstractSingInUser';
import { SignInUseCase } from '../../../../application/useCases/auth/signIn/SignIn';
import { AbstractAuthManager } from '../Auth';

/**
 * Service responsible for authentication operations.
 */
@Injectable()
export class AuthManager implements AbstractAuthManager {
  constructor(
    private userRepository: AbstractUserRepository,
    private jwtService: JwtService,
    private passwordHasher: AbstractPasswordHasher,
  ) {}

  /**
   * Signs in a user and generates an access token.
   * @param {string} email - The user's email.
   * @param {string} pass - The user's password.
   * @returns {Promise<LoginResponse>} A promise resolving to an object containing the access token.
   */
  async signIn(email: string, pass: string): Promise<LoginResponse> {
    const signInUseCase = new SignInUseCase(
      this.userRepository,
      this.jwtService,
      this.passwordHasher,
    );
    const result = await signInUseCase.execute(email, pass);
    return result;
  }
}
