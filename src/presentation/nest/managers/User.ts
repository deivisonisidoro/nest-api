import { User } from "@prisma/client";
import { CreateUserResponse } from "src/application/useCases/user/Create/AbstractCreateUser";
import { DeleteUserResponse } from "src/application/useCases/user/Delete/AbstractDeleteUser";
import { UserResponse } from "src/application/useCases/user/Read/AbstractReadUser";
import { GetUsersResponse } from "src/application/useCases/user/Read/AbstractReadUsers";
import { CreateUserRequestDto } from "src/domain/dtos/user/Create";
import { ReadUsersRequestDto } from "src/domain/dtos/user/ReadUsers";
import { UpdateUserRequestDto } from "src/domain/dtos/user/Update";
import { Either } from "src/domain/utils/either/either";
import { RequiredParametersError } from "src/domain/utils/errors/RequiredParametersError";




/**
 * Abstract class defining the contract for a service handling user operations.
 */
export abstract class AbstractUserManager {
  /**
   * Executes the use case to create a new user.
   * @param {CreateUserRequestDto} createUserRequestDto - The data required to create the user.
   * @returns {Promise<CreateUserResponse>} A promise resolving to the created user.
   */
  abstract create(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponse>;
  
  /**
   * Executes the get all users use case.
   *
   * @async
   * @param {ReadUsersRequestDto} data - The data containing parameters for users retrieval, such as filters and pagination settings.
   * @returns {Promise<GetUsersResponse>} The response data containing users information.
   */
  abstract getAll(data: ReadUsersRequestDto): Promise<GetUsersResponse>;
  
  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<UserResponse>} The user if found, or null if not found.
   */
  abstract getById(userId: string): Promise<UserResponse>;


  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - The data to update the user.
   * @returns {Promise<UserResponse>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  abstract update(userId: string, updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponse>;

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<DeleteUserResponse>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  abstract delete(userId: string): Promise<DeleteUserResponse>;
}
