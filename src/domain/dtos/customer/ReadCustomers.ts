import { IsOptional, IsEmail, IsUUID } from 'class-validator';

/**
 * DTO for fetching customers information.
 */
export class ReadCustomersRequestDto {
  /**
   * The email of the customer.
   *
   * @type {string}
   * @memberof ReadCustomersRequestDto
   * @example 'customer@example.com'
   */
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  /**
   * The ID of the customer.
   *
   * @type {string}
   * @memberof ReadCustomersRequestDto
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id?: string;

  /**
   * The first name of the customer.
   *
   * @type {string}
   * @memberof ReadCustomersRequestDto
   * @example 'John'
   */
  @IsOptional()
  firstName?: string;

  /**
   * The last name of the customer.
   *
   * @type {string}
   * @memberof ReadCustomersRequestDto
   * @example 'Doe'
   */
  @IsOptional()
  lastName?: string;
}
