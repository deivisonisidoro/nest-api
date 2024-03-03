import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginRequestDTO{
  @ApiProperty({ description: 'The email address of the user. Required and must not be empty.' }) 
  @IsNotEmpty()
  email: string;
  @ApiProperty({ description: 'The password of the user. Required and must not be empty.' })
  @IsNotEmpty()
  password: string;
}