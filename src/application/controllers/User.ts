import { CreateUserRequestDto } from '../../domain/dtos/user/Create';
import { ReadUsersRequestDto } from '../../domain/dtos/user/ReadUsers';
import { User } from '../../domain/entities/User';
import { UpdateUserRequestDto } from '../../domain/dtos/user/Update';

/**
 * Abstract controller providing endpoints for user management operations.
 */
export abstract class AbstractUsersController {
  /**
   * Creates a new user.
   * @param {CreateUserRequestDto} createUserRequestDto - Data required to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  abstract create(createUserRequestDto: CreateUserRequestDto): Promise<User>;

  /**
   * Retrieves all users.
   * @param {ReadUsersRequestDto} query - Data containing parameters for user retrieval, such as filters and pagination settings.
   * @returns {Promise<User[]>} A promise resolving to an array containing all users.
   */
  abstract getAll(query: ReadUsersRequestDto): Promise<User[]>;

  /**
   * Retrieves a user by their ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} A promise resolving to the user if found, or null if not found.
   */
  abstract getById(userId: string): Promise<User | null>;

  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - Data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  abstract update(
    userId: string,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<User | null>;

  /**
   * Deletes a user by their ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  abstract delete(userId: string): Promise<boolean>;
}
