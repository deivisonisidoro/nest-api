import { Injectable } from '@nestjs/common';

import { DeleteUserResponse } from '../../../../application/useCases/user/Delete/AbstractDeleteUser';
import { UserResponse } from '../../../../application/useCases/user/Read/AbstractReadUser';
import { GetUsersResponse } from '../../../../application/useCases/user/Read/AbstractReadUsers';
import { AbstractUserManager } from '../User';
import { AbstractPasswordHasher } from './../../../../application/providers/PasswordHasher';
import { AbstractUserRepository } from './../../../../application/repositories/User';
import {
  AbstractCreateUserUseCase,
  CreateUserResponse,
} from './../../../../application/useCases/user/Create/AbstractCreateUser';
import { CreateUserUseCase } from './../../../../application/useCases/user/Create/CreateUser';
import { DeleteUserUseCase } from './../../../../application/useCases/user/Delete/DeleteUser';
import { ReadUserUseCase } from './../../../../application/useCases/user/Read/ReadUser';
import { ReadUsersUseCase } from './../../../../application/useCases/user/Read/ReadUsers';
import { UpdateUserUseCase } from './../../../../application/useCases/user/Update/UpdateUser';
import { CreateUserRequestDto } from './../../../../domain/dtos/user/Create';
import { ReadUsersRequestDto } from './../../../../domain/dtos/user/ReadUsers';
import { UpdateUserRequestDto } from './../../../../domain/dtos/user/Update';

/**
 * Implementation of the service handling user operations.
 */
@Injectable()
export class UserManager implements AbstractUserManager {
  /**
   * Constructs the UserManager.
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
  async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponse> {
    const createUserUseCase: AbstractCreateUserUseCase = new CreateUserUseCase(
      this.userRepository,
      this.passwordHasher,
    );
    const result = await createUserUseCase.execute(createUserRequestDto);
    return result;
  }

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  async getAll(
    readUsersRequestDto: ReadUsersRequestDto,
  ): Promise<GetUsersResponse> {
    const readUsersUseCase = new ReadUsersUseCase(this.userRepository);
    const result = await readUsersUseCase.execute(readUsersRequestDto);
    return result;
  }

  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
   */
  async getById(userId: string): Promise<UserResponse> {
    const readUserUseCase = new ReadUserUseCase(this.userRepository);
    const result = await readUserUseCase.execute({ id: userId });
    return result;
  }

  /**
   * Updates an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - The data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  async update(
    userId: string,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserResponse> {
    const updateUserUseCase = new UpdateUserUseCase(
      this.userRepository,
      this.passwordHasher,
    );
    const result = await updateUserUseCase.execute(
      userId,
      updateUserRequestDto,
    );
    return result;
  }

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  async delete(userId: string): Promise<DeleteUserResponse> {
    const deleteUserUseCase = new DeleteUserUseCase(this.userRepository);
    const result = await deleteUserUseCase.execute(userId);
    return result;
  }
}
