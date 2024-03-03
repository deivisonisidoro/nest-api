import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/entities/User';
import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../../domain/dtos/user/Update';
import { AbstractUserRepository } from '../../../repositories/User';
import { AbstractUserService } from '../User';

/**
 * Implementation of the service handling user operations.
 */
@Injectable()
export class UserService implements AbstractUserService {
  
  /**
   * Constructs the UserService.
   * @param {AbstractUserRepository} userRepository - The repository for user data.
   */
  constructor(private readonly userRepository: AbstractUserRepository) {}

  /**
   * Executes the use case to create a user.
   * @param {CreateUserRequestDto} CreateUserRequestDto - Data to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  async create(CreateUserRequestDto: CreateUserRequestDto): Promise<User> {
    return this.userRepository.createUser(CreateUserRequestDto);
  }

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  async getAll(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
  
  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
  */
  async getById(userId: string): Promise<User | null> {
   return this.userRepository.getUserById(userId);
  }

  /**
     * Retrieves a user by Email.
     * @param {string} email - The Email of the user to retrieve.
     * @returns {Promise<User | null>} The user if found, or null if not found.
    */
  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} UpdateUserRequestDto - The data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  async update(userId: string, UpdateUserRequestDto: UpdateUserRequestDto): Promise<User | null> {
    return this.userRepository.updateUser(userId, UpdateUserRequestDto);
  }

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  async delete(userId: string): Promise<boolean> {
    return this.userRepository.deleteUser(userId);
  }

}
