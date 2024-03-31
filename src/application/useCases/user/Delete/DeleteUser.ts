import { AbstractUserRepository } from "../../../repositories/User";

import { UserErrorMessageEnum } from "../../../../domain/enums/user/ErrorMessage";
import { left, right } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { AbstractDeleteUserUseCase, DeleteUserResponse } from "./AbstractDeleteUser";


/**
 * Use case for deleting a user.
 *
 * @class
 * @implements {AbstractDeleteUserUseCase}
 */
export class DeleteUserUseCase implements AbstractDeleteUserUseCase {
  /**
   * Creates an instance of DeleteUserUseCase.
   *
   * @constructor
   * @param {AbstractUserRepository} userRepository - The repository for user data.
   */
  constructor(private userRepository: AbstractUserRepository) {}

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  async execute(userId: string): Promise<DeleteUserResponse> {
    const user = await this.userRepository.getUser({id: userId});
    if (!user) {
      return left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
    }
    const userIsDeleted = await this.userRepository.deleteUser(userId)
    return right(userIsDeleted);
  }
}