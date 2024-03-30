import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AbstractPasswordHasher } from '../../../application/providers/PasswordHasher';
import { AbstractUserRepository } from '../../../application/repositories/User';
import { AbstractAuthService, LoginResponse } from '../../../application/services/Auth';
import { AuthErrorMessageEnum } from '../../../domain/enums/auth/ErrorMessage';
import { left, right } from '../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../domain/utils/errors/RequiredParametersError';


/**
 * Service responsible for authentication operations.
 */
@Injectable()
export class AuthService implements AbstractAuthService {
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
  async signIn(
    email: string,
    pass: string,
  ): Promise<LoginResponse> {
    const user = await this.userRepository.getUserByEmail(email);
    
    if (!user) {
      return left(new RequiredParametersError(AuthErrorMessageEnum.EmailOrPasswordWrong));
    }
    const passwordMatch = await this.passwordHasher.comparePasswords(
      pass,
      user.password,
    )
    if (!passwordMatch) {
      return left(new RequiredParametersError(AuthErrorMessageEnum.EmailOrPasswordWrong));
    }
    const payload = { sub: user.id, email: user.email };
    return right({
      access_token: await this.jwtService.signAsync(payload),
    });
  }
}
