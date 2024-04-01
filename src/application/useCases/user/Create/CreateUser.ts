import { CreateUserRequestDto } from "../../../../domain/dtos/user/Create"
import { AbstractPasswordHasher } from "../../../providers/PasswordHasher"
import { AbstractUserRepository } from "../../../repositories/User"

import { UserErrorMessageEnum } from "../../../../domain/enums/user/ErrorMessage"
import { left, right } from "../../../../domain/utils/either/either"
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError"
import { AbstractCreateUserUseCase, CreateUserResponse } from "./AbstractCreateUser"


/**
 * Use case for creating a new user.
 *
 * @class
 * @implements {AbstractCreateUserUseCase}
 */
export class CreateUserUseCase implements AbstractCreateUserUseCase {
  /**
   * Creates an instance of CreateUserUseCase.
   *
   * @constructor
   * @param {AbstractUserRepository} userRepository - The repository for user data.
   * @param {AbstractPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    protected userRepository: AbstractUserRepository,
    protected passwordHasher: AbstractPasswordHasher,
  ) {}

  /**
   * Executes the create user use case.
   *
   * @async
   * @param {CreateUserRequestDto} createUserRequestDto - Data representing the request to create a user.
   * @returns {Promise<CreateUserResponse>} A promise resolving to the response data.
   */
  async execute(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.userRepository.getUser(
      { email: createUserRequestDto.email },
    );
    if (userAlreadyExists) {
      return left(new RequiredParametersError(UserErrorMessageEnum.UserAlreadyExists, 400));
    }
    const passwordHashed = await this.passwordHasher.hashPassword(createUserRequestDto.password);
    const user = await this.userRepository.createUser({...createUserRequestDto, password: passwordHashed});
    return right(user);
  }
}