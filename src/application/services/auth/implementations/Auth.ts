import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AbstractUserService } from '../../user/User';
import { JwtService } from '@nestjs/jwt';
import { AbstractAuthService } from '../Auth';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/ErrorMessage';

/**
 * Service responsible for authentication operations.
 */
@Injectable()
export class AuthService implements AbstractAuthService {
  constructor(
    private usersService: AbstractUserService,
    private jwtService: JwtService,
    private passwordHasher: AbstractPasswordHasher,
  ) {}
  
  /**
   * Signs in a user and generates an access token.
   * @param {string} email - The user's email.
   * @param {string} pass - The user's password.
   * @returns {Promise<{ access_token: string }>} A promise resolving to an object containing the access token.
   * @throws {UnauthorizedException} Thrown if the provided credentials are invalid.
   */
  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.getByEmail(email);
    
    if (!user) {
      throw new BadRequestException(AuthErrorMessageEnum.EmailOrPasswordWrong);
    }
    const passwordMatch = await this.passwordHasher.comparePasswords(
      pass,
      user.password,
    )
    if (!passwordMatch) {
      throw new UnauthorizedException(AuthErrorMessageEnum.EmailOrPasswordWrong);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
