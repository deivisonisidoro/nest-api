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
   * @param {CreateUserRequestDto} createUserRequestDto - Data to create the user.
   * @returns {Promise<User>} The created user.
   */
  abstract createUser(createUserRequestDto: CreateUserRequestDto): Promise<User>;

  /**
   * Retrieves a user.
   * @param {ReadUserRequestDto} data - The data of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
   */
  abstract getUser(data: ReadUserRequestDto): Promise<User | null>;

  /**
   * Updates a user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - Data to update the user.
   * @returns {Promise<User | null>} The updated user if found and updated, or null if not found.
   */
  abstract updateUser(userId: string, updateUserRequestDto: UpdateUserRequestDto): Promise<User | null>;

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} True if the user was deleted successfully, false otherwise.
   */
  abstract deleteUser(userId: string): Promise<boolean>;

  /**
   * Retrieves all users.
   * @param {ReadUsersRequestDto} data - The data of the user to retrieve.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  abstract getUsers(data: ReadUsersRequestDto): Promise<User[]>;
}
