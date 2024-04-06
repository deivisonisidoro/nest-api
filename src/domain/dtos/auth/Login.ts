import { IsNotEmpty } from "class-validator";

/**
 * Data transfer object (DTO) representing a login request.
 */
export class LoginRequestDTO {
  /**
   * The email address of the user. Required and must not be empty.
   *
   * @swagger
   * required: true
   * type: string
   * description: The email address of the user.
   * example: user@example.com
   */
  @IsNotEmpty()
  email: string;

  /**
   * The password of the user. Required and must not be empty.
   *
   * @swagger
   * required: true
   * type: string
   * description: The password of the user.
   * example: password123
   */
  @IsNotEmpty()
  password: string;
}
