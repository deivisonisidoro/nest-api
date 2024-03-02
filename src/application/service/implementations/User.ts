import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/User';
import { CreateUserDto } from '../../../domain/dtos/user/Create';
import { UpdateUserDto } from '../../../domain/dtos/user/Update';
import { AbstractUserRepository } from '../../repositories/User';
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
   * @param {CreateUserDto} createUserDto - Data to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
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
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - The data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userRepository.updateUser(userId, updateUserDto);
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
