import { IsOptional, IsEmail, IsUUID } from 'class-validator';

/**
 * DTO for fetching user information.
 */
export class ReadUserRequestDto {
  /**
   * The email of the user.
   *
   * @type {string}
   * @memberof ReadUserRequestDto
   * @example 'user@example.com'
   */
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  /**
   * The ID of the user.
   *
   * @type {string}
   * @memberof ReadUserRequestDto
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id?: string;
}
