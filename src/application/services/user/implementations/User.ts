import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../../../domain/entities/User';
import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../../domain/dtos/user/Update';
import { AbstractUserRepository } from '../../../repositories/User';
import { AbstractUserService } from '../User';
import { AbstractPasswordHasher } from '../../../../application/providers/PasswordHasher';
import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';

/**
 * Implementation of the service handling user operations.
 */
@Injectable()
export class UserService implements AbstractUserService {
  
  /**
   * Constructs the UserService.
   * @param {AbstractUserRepository} userRepository - The repository for user data.
   */
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private passwordHasher: AbstractPasswordHasher,  
  ) {}

  /**
   * Executes the use case to create a user.
   * @param {CreateUserRequestDto} createUserRequestDto - Data to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  async create(createUserRequestDto: CreateUserRequestDto): Promise<User> {
    const userAlreadyExists = await this.userRepository.getUserByEmail(
      createUserRequestDto.email,
    )
    if (userAlreadyExists){
      throw new BadRequestException(UserErrorMessageEnum.UserAlreadyExists);
    }
    const passwordHashed = await this.passwordHasher.hashPassword(createUserRequestDto.password)
    return this.userRepository.createUser({...createUserRequestDto, password: passwordHashed});
  }

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  async getAll(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    if(users.length === 0){
      throw new NotFoundException(UserErrorMessageEnum.UserNotFound);
    }
    return users
  }
  
  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
  */
  async getById(userId: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(userId);
    if (!user){
      throw new BadRequestException(UserErrorMessageEnum.UserDoesNotExist);
    }
   return user
  }

  /**
     * Retrieves a user by Email.
     * @param {string} email - The Email of the user to retrieve.
     * @returns {Promise<User | null>} The user if found, or null if not found.
    */
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user){
      throw new BadRequestException(UserErrorMessageEnum.UserDoesNotExist);
    }
    return user;
  }

  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - The data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  async update(userId: string, updateUserRequestDto: UpdateUserRequestDto): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(
      updateUserRequestDto.email,
    )
    if (!user) {
      throw new BadRequestException(UserErrorMessageEnum.UserDoesNotExist);
    }
    if (updateUserRequestDto.password) {
      updateUserRequestDto.password = await this.passwordHasher.hashPassword(updateUserRequestDto.password)
    }
    const userUpdated = await this.userRepository.updateUser(userId, updateUserRequestDto);
    return userUpdated
  }

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  async delete(userId: string): Promise<boolean> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestException(UserErrorMessageEnum.UserDoesNotExist);
    }
    return await this.userRepository.deleteUser(userId);
  }

}
