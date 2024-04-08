import { IsNotEmpty } from 'class-validator';

/**
 * Data transfer object (DTO) representing a login request.
 */
export class LoginRequestDTO {
  /**
   * The email address of the customer. Required and must not be empty.
   *
   * @swagger
   * required: true
   * type: string
   * description: The email address of the customer.
   * example: customer@example.com
   */
  @IsNotEmpty()
  email: string;

  /**
   * The password of the customer. Required and must not be empty.
   *
   * @swagger
   * required: true
   * type: string
   * description: The password of the customer.
   * example: password123
   */
  @IsNotEmpty()
  password: string;
}
