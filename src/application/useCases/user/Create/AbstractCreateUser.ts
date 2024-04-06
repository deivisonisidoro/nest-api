import { User } from 'src/domain/entities/User';
import { Either } from 'src/domain/utils/either/either';
import { RequiredParametersError } from 'src/domain/utils/errors/RequiredParametersError';

import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';

/**
 * Represents the response of creating a user, which can either be a success (Right) containing the created user
 * or a failure (Left) containing a RequiredParametersError indicating missing parameters.
 */
export type CreateUserResponse = Either<RequiredParametersError, User>;

/**
 * Abstract class defining the contract for the use case of creating a new user.
 */
export abstract class AbstractCreateUserUseCase {
  /**
   * Executes the create user use case asynchronously.
   *
   * @async
   * @param {CreateUserRequestDto} createUserRequestDto - Data representing the request to create a user.
   * @returns {Promise<CreateUserResponse>} A promise resolving to the response data.
   */
  abstract execute(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponse>;
}
