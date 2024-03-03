import { User } from '../../domain/entities/User';
import { CreateUserRequestDto } from '../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../domain/dtos/user/Update';

/**
 * Abstract class defining the contract for a user repository providing CRUD operations.
 */
export abstract class AbstractUserRepository {
  /**
   * Creates a new user.
   * @param {CreateUserRequestDto} CreateUserRequestDto - Data to create the user.
   * @returns {Promise<User>} The created user.
   */
  abstract createUser(CreateUserRequestDto: CreateUserRequestDto): Promise<User>;

  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
   */
  abstract getUserById(userId: string): Promise<User | null>;
  
  /**
   * Retrieves a user by Email.
   * @param {string} email - The Email of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
   */
  abstract getUserByEmail(email: string): Promise<User | null>;

  /**
   * Updates a user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} UpdateUserRequestDto - Data to update the user.
   * @returns {Promise<User | null>} The updated user if found and updated, or null if not found.
   */
  abstract updateUser(userId: string, UpdateUserRequestDto: UpdateUserRequestDto): Promise<User | null>;

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} True if the user was deleted successfully, false otherwise.
   */
  abstract deleteUser(userId: string): Promise<boolean>;

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  abstract getAllUsers(): Promise<User[]>;
}
