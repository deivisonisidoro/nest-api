import { JwtService } from "@nestjs/jwt";
import { AbstractPasswordHasher } from "../../../providers/PasswordHasher";
import { AbstractUserRepository } from "../../../repositories/User";
import { AuthErrorMessageEnum } from "../../../../domain/enums/auth/ErrorMessage";
import { left, right } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { AbstractSingInUserUseCase, LoginResponse } from "./AbstractSingInUser";

/**
 * Use case for authenticating a user.
 *
 * @class
 * @implements {AbstractSingInUserUseCase}
 */
export class SignInUseCase implements AbstractSingInUserUseCase {
  /**
   * Creates an instance of SignInUseCase.
   *
   * @constructor
   * @param {AbstractUserRepository} userRepository - The repository for user data.
   * @param {AbstractPasswordHasher} passwordHasher - The password hasher provider.
   * @param {JwtService} jwtService - The JWT service for generating tokens.
   */
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
  async execute(
    email: string,
    pass: string,
  ): Promise<LoginResponse> {
    const user = await this.userRepository.getUser({email});
    
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