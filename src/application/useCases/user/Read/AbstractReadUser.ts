
import { User } from "@prisma/client";
import { Either } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { ReadUserRequestDto } from "../../../../domain/dtos/user/ReadUser";

export type UserResponse = Either<RequiredParametersError, User | null>

/**
 * Abstract class for GetAllUserUseCase.
 *
 */
export abstract class AbstractReadUserUseCase {
  /**
   * Executes the get all users use case.
   *
   * @async
   * @param {ReadUserRequestDto} data - The data containing parameters for user retrieval, such as filters and pagination settings.
   * @returns {Promise<UserResponse>} The response data containing user information.
   */
  abstract execute(data: ReadUserRequestDto): Promise<UserResponse>;
}