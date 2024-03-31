import { User } from "@prisma/client";
import { Either } from "src/domain/utils/either/either";
import { RequiredParametersError } from "src/domain/utils/errors/RequiredParametersError";
import { CreateUserRequestDto } from "../../../../domain/dtos/user/Create";


export type CreateUserResponse = Either<RequiredParametersError, User>


/**
 * Abstract class for the use case of creating a new user.
 */
export abstract class AbstractCreateUserUseCase {

  /**
   * Executes the create user use case.
   *
   * @async
   * @param {CreateUserRequestDto} createUserRequestDto - The user creation request data.
   * @returns {Promise<CreateUserResponse>} The response data.
   */
  abstract execute(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponse>;
}