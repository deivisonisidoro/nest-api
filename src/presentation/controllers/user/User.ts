import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AbstractUserService } from '../../../application/services/user/User';
import { CreateUserRequestDto } from '../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../domain/dtos/user/Update';
import { User } from '../../../domain/entities/User';
import { AbstractUsersController } from '../../../application/controllers/User';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller for handling user-related operations.
 */
@ApiTags("Users")
@Controller('users')
export class UsersController implements AbstractUsersController{
  constructor(
    private readonly userService: AbstractUserService
  ) {}

  /**
   * Endpoint for creating a new user.
   * @param {CreateUserRequestDto} CreateUserRequestDto - Data to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  @Post()
  create(@Body() createUserRequestDto: CreateUserRequestDto): Promise<User> {
    return this.userService.create(createUserRequestDto);
  }

  /**
   * Endpoint for retrieving a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} A promise resolving to the user if found, or null if not found.
   */
  @Get(':id')
  getById(@Param('id') userId: string): Promise<User | null> {
    return this.userService.getById(userId);
  }

  /**
   * Endpoint for updating an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - Data to update the user.
   * @returns {Promise<User | null>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  @Put(':id')
  update(@Param('id') userId: string, @Body() updateUserRequestDto: UpdateUserRequestDto): Promise<User | null> {
    return this.userService.update(userId, updateUserRequestDto);
  }

  /**
   * Endpoint for deleting a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  @Delete(':id')
  delete(@Param('id') userId: string): Promise<boolean> {
    return this.userService.delete(userId);
  }

  /**
   * Endpoint for retrieving all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
}
