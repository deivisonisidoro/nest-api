import { Either } from "src/domain/utils/either/either";
import { RequiredParametersError } from "src/domain/utils/errors/RequiredParametersError";

export type DeleteUserResponse = Either<RequiredParametersError, boolean>;


/**
 * Abstract class for deleting a user.
 *
 * @abstract
 * @class
 */
export abstract class AbstractDeleteUserUseCase {
  /**
   * Deletes a user by ID.
   * @abstract
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<DeleteUserResponse>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  abstract execute(userId: string): Promise<DeleteUserResponse>;
}
