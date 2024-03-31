import { AbstractUserRepository } from "../../../repositories/User";

import { UserErrorMessageEnum } from "../../../../domain/enums/user/ErrorMessage";
import { left, right } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { AbstractReadUsersUseCase, GetUsersResponse } from "./AbstractReadUsers";
import { ReadUsersRequestDto } from "../../../../domain/dtos/user/ReadUsers";

/**
 * Use case for retrieving all userss.
 *
 * @class
 * @implements {AbstractReadUsersUseCase}
 */
export class ReadUsersUseCase implements AbstractReadUsersUseCase {
  /**
   * Creates an instance of UpdateUsersUseCase.
   *
   * @constructor
   * @param {AbstractUserRepository} userRepository - The repository for users data.
   */
  constructor(
    private userRepository: AbstractUserRepository,
  ) {}

  /**
   * Executes the get all userss use case.
   *
   * @async
   * @param {ReadUsersRequestDto} data - The data containing parameters for users retrieval, such as filters and pagination settings.
   * @returns {Promise<ResponseDTO>} The response data containing users information.
   */
  async execute(data: ReadUsersRequestDto): Promise<GetUsersResponse> {
    const users = await this.userRepository.getUsers(data);
    if(users.length === 0){
      return  left(new RequiredParametersError(UserErrorMessageEnum.UserNotFound, 404));
    }
    return right(users)
  }
}