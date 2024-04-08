import { JwtService } from '@nestjs/jwt';

import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/ErrorMessage';
import { left, right } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import { AbstractSingInUseCase, LoginResponse } from './AbstractSingIn';

/**
 * Use case for authenticating a customer.
 *
 * @class
 * @implements {AbstractSingInUseCase}
 */
export class SignInUseCase implements AbstractSingInUseCase {
  /**
   * Creates an instance of SignInUseCase.
   *
   * @constructor
   * @param {AbstractCustomerRepository} customerRepository - The repository for customer data.
   * @param {AbstractPasswordHasher} passwordHasher - The password hasher provider.
   * @param {JwtService} jwtService - The JWT service for generating tokens.
   */
  constructor(
    private customerRepository: AbstractCustomerRepository,
    private jwtService: JwtService,
    private passwordHasher: AbstractPasswordHasher,
  ) {}

  /**
   * Signs in a customer and generates an access token.
   * @param {string} email - The email of the customer.
   * @param {string} password - The password of the customer.
   * @returns {Promise<LoginResponse>} A promise resolving to an object containing the access token.
   */
  async execute(email: string, password: string): Promise<LoginResponse> {
    const customer = await this.customerRepository.getCustomer({ email });
    if (!customer) {
      return left(
        new RequiredParametersError(AuthErrorMessageEnum.EmailOrPasswordWrong),
      );
    }
    const passwordMatch = await this.passwordHasher.comparePasswords(
      password,
      customer.password,
    );
    if (!passwordMatch) {
      return left(
        new RequiredParametersError(AuthErrorMessageEnum.EmailOrPasswordWrong),
      );
    }
    const payload = { sub: customer.id, email: customer.email };
    return right({
      access_token: await this.jwtService.signAsync(payload),
    });
  }
}
