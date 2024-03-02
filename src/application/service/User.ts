import { User } from '../../domain/entities/User';
import { CreateUserDto } from '../../domain/dtos/user/Create';
import { UpdateUserDto } from '../../domain/dtos/user/Update';

/**
 * Abstract class defining the contract for a service handling user operations.
 */
export abstract class AbstractUserService {
  /**
   * Executes the use case to create a new user.
   * @param {CreateUserDto} createUserDto - The data required to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  
  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  abstract getAll(): Promise<User[]>;
  
  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
   */
  abstract getById(userId: string): Promise<User | null>;

  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - The data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  abstract update(userId: string, updateUserDto: UpdateUserDto): Promise<User | null>;

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  abstract delete(userId: string): Promise<boolean>;
}
