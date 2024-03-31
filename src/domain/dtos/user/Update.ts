import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO (Data Transfer Object) for updating a user.
 */
export class UpdateUserRequestDto {
  /**
   * The new email of the user.
   *
   * @type {string}
   * @memberof UpdateUserRequestDto
   * @example 'user@example.com'
   */
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
  
  /**
   * The new first name of the user.
   *
   * @type {string}
   * @memberof UpdateUserRequestDto
   * @example 'John'
   */
  firstName?: string;
  
  /**
   * The new last name of the user.
   *
   * @type {string}
   * @memberof UpdateUserRequestDto
   * @example 'Doe'
   */
  lastName?: string;
  
  /**
   * The new password of the user.
   *
   * @type {string}
   * @memberof UpdateUserRequestDto
   * @example 'newpassword123'
   */
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  /**
   * Creates an instance of UpdateUserRequestDto.
   * @param {string} email - The new email of the user.
   * @param {string} firstName - The new first name of the user.
   * @param {string} lastName - The new last name of the user.
   * @param {string} password - The new password of the user.
   */
  constructor(email?: string, firstName?: string, lastName?: string, password?: string) {
    if (email) this.email = email;
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (password) this.password = password;
  }
}
