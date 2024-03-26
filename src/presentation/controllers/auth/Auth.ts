import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractAuthService } from '../../../application/services/auth/Auth';
import { LoginRequestDTO } from '../../../domain/dtos/auth/Login';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { Public } from '../../helpers/customDecorator/Public';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AbstractAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: LoginRequestDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}