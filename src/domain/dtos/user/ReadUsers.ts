import { IsOptional, IsEmail, IsUUID } from 'class-validator';

/**
 * DTO for fetching users information.
 */
export class ReadUsersRequestDto {
  /**
   * The email of the user.
   *
   * @type {string}
   * @memberof ReadUsersRequestDto
   * @example 'user@example.com'
   */
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  /**
   * The ID of the user.
   *
   * @type {string}
   * @memberof ReadUsersRequestDto
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id?: string;

  /**
   * The first name of the user.
   *
   * @type {string}
   * @memberof ReadUsersRequestDto
   * @example 'John'
   */
  @IsOptional()
  firstName?: string;

  /**
   * The last name of the user.
   *
   * @type {string}
   * @memberof ReadUsersRequestDto
   * @example 'Doe'
   */
  @IsOptional()
  lastName?: string;
}
