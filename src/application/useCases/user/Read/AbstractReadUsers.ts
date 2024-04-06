import { Either } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { ReadUsersRequestDto } from "../../../../domain/dtos/user/ReadUsers";
import { User } from "../../../../domain/entities/User";

export type GetUsersResponse = Either<RequiredParametersError, User[]>;

/**
 * Abstract use case for retrieving all users.
 *
 * @abstract
 * @class
 * @implements {AbstractReadUsersUseCase}
 */
export abstract class AbstractReadUsersUseCase implements AbstractReadUsersUseCase {

  /**
   * Executes the get all users use case.
   *
   * @async
   * @param {ReadUsersRequestDto} data - The data containing parameters for users retrieval, such as filters and pagination settings.
   * @returns {Promise<GetUsersResponse>} The response data containing users information.
   */
  abstract execute(data: ReadUsersRequestDto): Promise<GetUsersResponse>;
}
