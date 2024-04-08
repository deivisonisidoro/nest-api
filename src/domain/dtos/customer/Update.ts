import { IsEmail, MinLength } from 'class-validator';

/**
 * DTO (Data Transfer Object) for updating a customer.
 */
export class UpdateCustomerRequestDto {
  /**
   * The new email of the customer.
   *
   * @type {string}
   * @memberof UpdateCustomerRequestDto
   * @example 'customer@example.com'
   */
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  /**
   * The new first name of the customer.
   *
   * @type {string}
   * @memberof UpdateCustomerRequestDto
   * @example 'John'
   */
  firstName?: string;

  /**
   * The new last name of the customer.
   *
   * @type {string}
   * @memberof UpdateCustomerRequestDto
   * @example 'Doe'
   */
  lastName?: string;

  /**
   * The new password of the customer.
   *
   * @type {string}
   * @memberof UpdateCustomerRequestDto
   * @example 'newpassword123'
   */
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  /**
   * Creates an instance of UpdateCustomerRequestDto.
   * @param {string} email - The new email of the customer.
   * @param {string} firstName - The new first name of the customer.
   * @param {string} lastName - The new last name of the customer.
   * @param {string} password - The new password of the customer.
   */
  constructor(
    email?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
  ) {
    if (email) this.email = email;
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (password) this.password = password;
  }
}
