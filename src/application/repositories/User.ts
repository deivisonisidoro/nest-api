import { User } from '../../domain/entities/User';
import { CreateUserRequestDto } from '../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../domain/dtos/user/Update';
import { ReadUsersRequestDto } from '../../domain/dtos/user/ReadUsers';
import { ReadUserRequestDto } from '../../domain/dtos/user/ReadUser';

/**
 * Abstract class defining the contract for a user repository providing CRUD operations.
 */
export abstract class AbstractUserRepository {
  /**
   * Creates a new user.
   * @param {CreateUserRequestDto} createUserRequestDto - Data required to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  abstract createUser(createUserRequestDto: CreateUserRequestDto): Promise<User>;

  /**
   * Retrieves a user.
   * @param {ReadUserRequestDto} data - Data identifying the user to retrieve.
   * @returns {Promise<User | null>} A promise resolving to the user if found, or null if not found.
   */
  abstract getUser(data: ReadUserRequestDto): Promise<User | null>;

  /**
   * Updates a user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - Data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  abstract updateUser(userId: string, updateUserRequestDto: UpdateUserRequestDto): Promise<User | null>;

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  abstract deleteUser(userId: string): Promise<boolean>;

  /**
   * Retrieves all users.
   * @param {ReadUsersRequestDto} data - Data containing parameters for user retrieval, such as filters and pagination settings.
   * @returns {Promise<User[]>} A promise resolving to an array containing all users.
   */
  abstract getUsers(data: ReadUsersRequestDto): Promise<User[]>;
}
