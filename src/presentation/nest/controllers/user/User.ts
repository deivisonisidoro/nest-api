import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../../domain/dtos/user/Update';
import { User } from '../../../../domain/entities/User';
import { AbstractUsersController } from '../../../../application/controllers/User';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../helpers/customDecorator/Public';
import { AbstractUserService } from '../../../../application/services/User';


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
   * @param {CreateUserRequestDto} createUserRequestDto - Data to create the user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  @Post()
  @Public()
  async create(@Body() createUserRequestDto: CreateUserRequestDto): Promise<User>{
    const result = await this.userService.create(createUserRequestDto);
    if (result.isLeft()){
      throw new BadRequestException(result.value.message)
    }
    return result.value;
  }

  /**
   * Endpoint for retrieving a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User>} A promise resolving to the user if found, or null if not found.
   */
  @Get(':id')
  async getById(@Param('id') userId: string): Promise<User> {
    const result = await this.userService.getById(userId);
    if (result.isLeft()){
      throw new NotFoundException(result.value.message)
    }
    return result.value;
  }

  /**
   * Endpoint for updating an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - Data to update the user.
   * @returns {Promise<User>} A promise resolving to the updated user if found and updated, or null if not found.
   */
  @Put(':id')
  async update(@Param('id') userId: string, @Body() updateUserRequestDto: UpdateUserRequestDto): Promise<User> {
    const result = await this.userService.update(userId, updateUserRequestDto);
    if (result.isLeft()){
      throw new BadRequestException(result.value.message)
    }
    return result.value;
  }

  /**
   * Endpoint for deleting a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, false otherwise.
   */
  @Delete(':id')
  async delete(@Param('id') userId: string): Promise<boolean> {
    const result = await this.userService.delete(userId);
    if (result.isLeft()){
      throw new BadRequestException(result.value.message)
    }
    return result.value
  }

  /**
   * Endpoint for retrieving all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  @Get()
  async getAll(): Promise<User[]> {
    const result = await this.userService.getAll();
    if (result.isLeft()){
      throw new NotFoundException(result.value.message)
    }
    return result.value;
  }
}
