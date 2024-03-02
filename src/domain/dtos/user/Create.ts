import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO (Data Transfer Object) for creating a user.
 */
export class CreateUserDto {
  @ApiProperty({ description: 'The email address of the user. Required and must not be empty.' }) 
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({ description: 'The first name of the user. Required and must not be empty.' }) 
  @IsNotEmpty() 
  firstName: string;
  
  @ApiProperty({ description: 'The last name of the user. Required and must not be empty.' }) 
  @IsNotEmpty() 
  lastName: string;
  
  @ApiProperty({ description: 'The password of the user. Required and must not be empty.' })
  @IsNotEmpty() 
  password: string;

  /**
   * Constructs a new CreateUserDto object.
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
