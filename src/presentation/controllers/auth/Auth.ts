import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractAuthService } from '../../../application/services/auth/Auth';
import { LoginRequestDTO } from '../../../domain/dtos/auth/Login';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AbstractAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginRequestDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}