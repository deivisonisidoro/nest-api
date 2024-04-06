import { Either } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { UpdateUserRequestDto } from "../../../../domain/dtos/user/Update";
import { User } from "../../../../domain/entities/User";

export type UserResponse = Either<RequiredParametersError, User | null>;

/**
 * Abstract class defining the contract for the use case of updating user information.
 */
export abstract class AbstractUpdateUserUseCase {
  /**
   * Executes the update user use case asynchronously.
   *
   * @param {string} userId - The ID of the user to be updated.
   * @param {UpdateUserRequestDto} updateUserRequestDto - The updated user information.
   * @returns {Promise<UserResponse>} The response data containing the updated user information.
   */
  abstract execute(userId: string, updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponse>;
}
