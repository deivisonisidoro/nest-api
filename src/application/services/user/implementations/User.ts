import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../../domain/dtos/user/Update';
import { AbstractPasswordHasher } from '../../../../application/providers/PasswordHasher';
import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';
import { AbstractUserRepository } from '../../../repositories/User';
import { AbstractUserService, CreateUserResponse, DeleteUserResponse, GetUsersResponse, UserResponse } from '../User';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { left, right } from '../../../../domain/utils/either/either';

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
  async create(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.userRepository.getUserByEmail(
      createUserRequestDto.email,
    )
    if (userAlreadyExists){
      return left(new RequiredParametersError(UserErrorMessageEnum.UserAlreadyExists, 400));
    }
    const passwordHashed = await this.passwordHasher.hashPassword(createUserRequestDto.password)
    const user = await this.userRepository.createUser({...createUserRequestDto, password: passwordHashed});
    return right(user)
  }

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  async getAll(): Promise<GetUsersResponse> {
    const users = await this.userRepository.getAllUsers();
    if(users.length === 0){
      return  left(new RequiredParametersError(UserErrorMessageEnum.UserNotFound, 404));
    }
    return right(users)
  }
  
  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
  */
  async getById(userId: string): Promise<UserResponse> {
    const user = await this.userRepository.getUserById(userId);
    if (!user){
      return left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
    }
   return right(user)
  }

  /**
     * Retrieves a user by Email.
     * @param {string} email - The Email of the user to retrieve.
     * @returns {Promise<User | null>} The user if found, or null if not found.
    */
  async getByEmail(email: string): Promise<UserResponse> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user){
      return left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
    }
    return right(user);
  }

  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - The data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  async update(userId: string, updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponse> {
    const user = await this.userRepository.getUserById(
      userId,
    )
    if (!user) {
      return left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
    }
    if (updateUserRequestDto.password) {
      updateUserRequestDto.password = await this.passwordHasher.hashPassword(updateUserRequestDto.password)
    }
    const userUpdated = await this.userRepository.updateUser(userId, updateUserRequestDto);
    return right(userUpdated)
  }

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  async delete(userId: string): Promise<DeleteUserResponse> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
    }
    const userIsDeleted = await this.userRepository.deleteUser(userId)
    return right(userIsDeleted);
  }

}
