import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

/**
 * DTO (Data Transfer Object) for creating a user.
 */
export class CreateUserRequestDto {
  /**
   * The email address of the user.
   *
   * @type {string}
   * @memberof CreateUserRequestDto
   * @example 'user@example.com'
   */
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  
  /**
   * The first name of the user.
   *
   * @type {string}
   * @memberof CreateUserRequestDto
   * @example 'John'
   */
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;
  
  /**
   * The last name of the user.
   *
   * @type {string}
   * @memberof CreateUserRequestDto
   * @example 'Doe'
   */
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;
  
  /**
   * The password of the user.
   *
   * @type {string}
   * @memberof CreateUserRequestDto
   * @example 'password123'
   */
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  /**
   * Constructs a new CreateUserRequestDto object.
   * @param {string} email - The email address of the user.
   * @param {string} firstName - The first name of the user.
   * @param {string} lastName - The last name of the user.
   * @param {string} password - The password of the user.
   */
  constructor(email: string, firstName: string, lastName: string, password: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
