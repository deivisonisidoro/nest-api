import { AbstractPasswordHasher } from "../../../providers/PasswordHasher";
import { AbstractUserRepository } from "../../../repositories/User";

import { UpdateUserRequestDto } from "../../../../domain/dtos/user/Update";
import { UserErrorMessageEnum } from "../../../../domain/enums/user/ErrorMessage";
import { left, right } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { AbstractUpdateUserUseCase, UserResponse } from "./AbstractUpdateUser";


/**
 * Use case for updating user information.
 *
 * @class
 * @implements {AbstractUpdateUserUseCase}
 */
export class UpdateUserUseCase implements AbstractUpdateUserUseCase {
  /**
   * Creates an instance of UpdateUserUseCase.
   *
   * @constructor
   * @param {AbstractUserRepository} userRepository - The repository for user data.
   * @param {AbstractPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: AbstractUserRepository,
    private passwordHasher: AbstractPasswordHasher,
  ) {}

  /**
   * Executes the update user use case.
   *
   * @async
   * @param {string} userId - The ID of the user to be updated.
   * @param {UpdateUserRequestDto} requestData - The updated user information.
   * @returns {Promise<UserResponse>} The response data containing the updated user information.
   */
  async execute(userId: string, updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponse> {
    const user = await this.userRepository.getUser(
      {id: userId},
    )
    if (!user) {
      return left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
    }
    if (updateUserRequestDto.password) {
      updateUserRequestDto.password = await this.passwordHasher.hashPassword(updateUserRequestDto.password)
    }
    const userUpdated = await this.userRepository.updateUser(userId, updateUserRequestDto);
    return right(userUpdated)
  }
}