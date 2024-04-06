import { Controller, Post, Body, BadRequestException, Get, Param, NotFoundException, Put, Delete, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";

import { AbstractUsersController } from "../../../../application/controllers/User";
import { CreateUserRequestDto } from "../../../../domain/dtos/user/Create";
import { ReadUsersRequestDto } from "../../../../domain/dtos/user/ReadUsers";
import { UpdateUserRequestDto } from "../../../../domain/dtos/user/Update";
import { AbstractUserManager } from "../../managers/User";
import { Public } from "../../helpers/customDecorator/Public";

/**
 * Controller for handling user-related operations.
 */
@ApiTags("Users")
@Controller('users')
export class UsersController implements AbstractUsersController {
  constructor(
    private readonly UserManager: AbstractUserManager
  ) {}

  /**
   * Endpoint for creating a new user.
   * @param {CreateUserRequestDto} createUserRequestDto - Data representing the request to create a user.
   * @returns {Promise<User>} A promise resolving to the created user.
   */
  @Post()
  @Public()
  async create(@Body() createUserRequestDto: CreateUserRequestDto): Promise<User> {
    const result = await this.UserManager.create(createUserRequestDto);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Endpoint for retrieving a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User>} A promise resolving to the user if found, otherwise null.
   */
  @Get(':id')
  async getById(@Param('id') userId: string): Promise<User> {
    const result = await this.UserManager.getById(userId);
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
    return result.value;
  }

  /**
   * Endpoint for updating an existing user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserRequestDto} updateUserRequestDto - Data representing the request to update the user.
   * @returns {Promise<User>} A promise resolving to the updated user if found and updated, otherwise null.
   */
  @Put(':id')
  async update(@Param('id') userId: string, @Body() updateUserRequestDto: UpdateUserRequestDto): Promise<User> {
    const result = await this.UserManager.update(userId, updateUserRequestDto);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Endpoint for deleting a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the user was deleted successfully, otherwise false.
   */
  @Delete(':id')
  async delete(@Param('id') userId: string): Promise<boolean> {
    const result = await this.UserManager.delete(userId);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Endpoint for retrieving all users.
   * @param {ReadUsersRequestDto} query - Data representing the request to read users.
   * @returns {Promise<User[]>} A promise resolving to an array containing all users.
   */
  @Get()
  async getAll(@Query() query: ReadUsersRequestDto): Promise<User[]> {
    const result = await this.UserManager.getAll(query);
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
    return result.value;
  }
}
