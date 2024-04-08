import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AbstractPasswordHasher } from '../../../../application/providers/PasswordHasher';
import { AbstractCustomerRepository } from '../../../../application/repositories/Customer';
import { LoginResponse } from '../../../../application/useCases/auth/signIn/AbstractSingIn';
import { SignInUseCase } from '../../../../application/useCases/auth/signIn/SignIn';
import { AbstractAuthManager } from '../Auth';

/**
 * Service responsible for authentication operations.
 */
@Injectable()
export class AuthManager implements AbstractAuthManager {
  constructor(
    private customerRepository: AbstractCustomerRepository,
    private jwtService: JwtService,
    private passwordHasher: AbstractPasswordHasher,
  ) {}

  /**
   * Signs in a customer and generates an access token.
   * @param {string} email - The customer's email.
   * @param {string} pass - The customer's password.
   * @returns {Promise<LoginResponse>} A promise resolving to an object containing the access token.
   */
  async signIn(email: string, pass: string): Promise<LoginResponse> {
    const signInUseCase = new SignInUseCase(
      this.customerRepository,
      this.jwtService,
      this.passwordHasher,
    );
    const result = await signInUseCase.execute(email, pass);
    return result;
  }
}
