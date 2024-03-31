import { AbstractUserRepository } from "../../../repositories/User";
import { ReadUserRequestDto } from "../../../../domain/dtos/user/ReadUser";
import { UserErrorMessageEnum } from "../../../../domain/enums/user/ErrorMessage";
import { left, right } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { AbstractReadUserUseCase, UserResponse } from "./AbstractReadUser";

/**
 * Use case for retrieving all users.
 *
 * @class
 * @implements {AbstractReadUserUseCase}
 */
export class ReadUserUseCase implements AbstractReadUserUseCase {
  /**
   * Creates an instance of UpdateUserUseCase.
   *
   * @constructor
   * @param {AbstractUserRepository} userRepository - The repository for user data.
   */
  constructor(
    private userRepository: AbstractUserRepository,
  ) {}

  /**
   * Executes the get all users use case.
   *
   * @async
   * @param {ReadUserRequestDto} data - The data containing parameters for user retrieval, such as filters and pagination settings.
   * @returns {Promise<ResponseDTO>} The response data containing user information.
   */
  async execute(data: ReadUserRequestDto): Promise<UserResponse> {
    const user = await this.userRepository.getUser(data);
    if (!user){
      return left(new RequiredParametersError(UserErrorMessageEnum.UserNotFound, 400));
    }
   return right(user)
  }
}