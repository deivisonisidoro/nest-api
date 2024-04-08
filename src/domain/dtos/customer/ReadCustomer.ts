import { IsOptional, IsEmail, IsUUID } from 'class-validator';

/**
 * DTO for fetching customer information.
 */
export class ReadCustomerRequestDto {
  /**
   * The email of the customer.
   *
   * @type {string}
   * @memberof ReadCustomerRequestDto
   * @example 'customer@example.com'
   */
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  /**
   * The ID of the customer.
   *
   * @type {string}
   * @memberof ReadCustomerRequestDto
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id?: string;
}
