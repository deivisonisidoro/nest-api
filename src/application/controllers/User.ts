import { CreateUserRequestDto } from '../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../domain/dtos/user/Update';
import { User } from '../../domain/entities/User';

/**
 * Abstract controller for handling user-related operations.
 */
export abstract class AbstractUsersController {
  /**
   * Endpoint for creating a new user.
   * @param {CreateUserRequestDto} CreateUserRequestDto - Data to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  abstract create(CreateUserRequestDto: CreateUserRequestDto): Promise<User>;

  /**
   * Endpoint for retrieving all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  abstract getAll(): Promise<User[]>;
  
  /**
   * Endpoint for retrieving a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} A promise resolving to the user if found, or null if not found.
   */
  abstract getById(userId: string): Promise<User | null>;

  /**
   * Endpoint for updating an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} UpdateUserRequestDto - Data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  abstract update(userId: string, UpdateUserRequestDto: UpdateUserRequestDto): Promise<User | null>;

  /**
   * Endpoint for deleting a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  abstract delete(userId: string): Promise<boolean>;

}
