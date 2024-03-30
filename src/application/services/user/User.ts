import { User } from '../../../domain/entities/User';
import { CreateUserRequestDto } from '../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../domain/dtos/user/Update';
import { RequiredParametersError } from 'src/domain/utils/errors/RequiredParametersError';
import { Either } from '../../../domain/utils/either/either';


export type CreateUserResponse = Either<RequiredParametersError, User>
export type GetUsersResponse = Either<RequiredParametersError, User[]>;
export type DeleteUserResponse = Either<RequiredParametersError, boolean>;
export type UserResponse = Either<RequiredParametersError, User | null>


/**
 * Abstract class defining the contract for a service handling user operations.
 */
export abstract class AbstractUserService {
  /**
   * Executes the use case to create a new user.
   * @param {CreateUserRequestDto} CreateUserRequestDto - The data required to create the user.
   * @returns {Promise<CreateUserResponse>} A promise resolving to the created user.
   */
  abstract create(CreateUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponse>;
  
  /**
   * Retrieves all users.
   * @returns {Promise<GetUsersResponse>} A promise resolving to an arexport ray of all users.
   */
  abstract getAll(): Promise<GetUsersResponse>
  
  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<UserResponse>} The user if found, or null if not found.
   */
  abstract getById(userId: string): Promise<UserResponse>;

  /**
   * Retrieves a user by email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<UserResponse>} The user if found, or null if not found.
   */
  abstract getByEmail(email: string): Promise<UserResponse>;

  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} UpdateUserRequestDto - The data to update the user.
   * @returns {Promise<UserResponse>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  abstract update(userId: string, UpdateUserRequestDto: UpdateUserRequestDto): Promise<UserResponse>;

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<DeleteUserResponse>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  abstract delete(userId: string): Promise<DeleteUserResponse>;
}
