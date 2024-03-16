import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO (Data Transfer Object) for updating a user.
 */
export class UpdateUserRequestDto {
  @ApiProperty({
    description: "The ID of the user to be updated."
  })
  id: string;

  @ApiProperty({ 
    required: false,
    description: "The new email of the user. Optional."
  })
  @IsEmail()
  email?: string;
  
  @ApiProperty({ 
    required: false,
    description: "The new first name of the user. Optional."
  })
  firstName?: string;
  

  @ApiProperty({ 
    required: false, 
    description: "The new last name of the user. Optional."
 })
  lastName?: string;
  

  @ApiProperty({ 
    required: false,
    description:  "The new password of the user."
  })
  @MinLength(8)
  password?: string;

  /**
   * Creates an instance of UpdateUserRequestDto.
   * @param id - The ID of the user to be updated.
   * @param email - The new email of the user.
   * @param firstName - The new first name of the user.
   * @param lastName - The new last name of the user.
   * @param password - The new password of the user.
   */
  constructor(id: string, email?: string, firstName?: string, lastName?: string, password?: string) {
    this.id = id;
    if (email) this.email = email;
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (password) this.password = password;
  }
}
