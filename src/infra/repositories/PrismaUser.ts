import { Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/User';
import { CreateUserDto } from '../../domain/dtos/user/Create';
import { UpdateUserDto } from '../../domain/dtos/user/Update';
import { AbstractUserRepository } from '../../application/repositories/User';
import { PrismaService } from '../database/prisma.service'; 

/**
 * Implementation of UserRepository using Prisma as the data source.
 */
@Injectable()
export class PrismaUserRepository implements AbstractUserRepository {
  /**
   * Constructs the PrismaUserRepository.
   * @param {PrismaService} prisma - The Prisma service for database access.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user.
   * @param {CreateUserDto} createUserDto - Data to create the user.
   * @returns {Promise<User>} The created user.
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdPrismaUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email.toString(),
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password.toString(),
        createdAt: new Date(),
      },
    });

    return this.mapPrismaUserToUserEntity(createdPrismaUser);
  }

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise resolving to an array of all users.
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.mapPrismaUserToUserEntity(user));
  }
  
  /**
   * Retrieves a user by ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User | null>} The user if found, or null if not found.
   */
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user ? this.mapPrismaUserToUserEntity(user) : null;
  }

  /**
   * Updates a user.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - Data to update the user.
   * @returns {Promise<User | null>} The updated user if found and updated, or null if not found.
   */
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: updateUserDto.email?.toString(),
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        password: updateUserDto.password?.toString(),
      },
    });
    return updatedUser ? this.mapPrismaUserToUserEntity(updatedUser) : null;
  }

  /**
   * Deletes a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} True if the user was deleted successfully, false otherwise.
   */
  async deleteUser(userId: string): Promise<boolean> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return !!deletedUser;
  }


  /**
   * Maps a Prisma user object to a User entity.
   * @param {any} prismaUser - The Prisma user object.
   * @returns {User} The User entity.
   */
  private mapPrismaUserToUserEntity(prismaUser: any): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt,
    };
  }
}
