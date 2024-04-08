import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO (Data Transfer Object) for creating a customer.
 */
export class CreateCustomerRequestDto {
  /**
   * The email address of the customer.
   *
   * @type {string}
   * @memberof CreateCustomerRequestDto
   * @example 'customer@example.com'
   */
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  /**
   * The first name of the customer.
   *
   * @type {string}
   * @memberof CreateCustomerRequestDto
   * @example 'John'
   */
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  /**
   * The last name of the customer.
   *
   * @type {string}
   * @memberof CreateCustomerRequestDto
   * @example 'Doe'
   */
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  /**
   * The password of the customer.
   *
   * @type {string}
   * @memberof CreateCustomerRequestDto
   * @example 'password123'
   */
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  /**
   * Constructs a new CreateCustomerRequestDto object.
   * @param {string} email - The email address of the customer.
   * @param {string} firstName - The first name of the customer.
   * @param {string} lastName - The last name of the customer.
   * @param {string} password - The password of the customer.
   */
  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
