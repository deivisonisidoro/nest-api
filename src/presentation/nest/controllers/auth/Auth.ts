import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDTO } from '../../../../domain/dtos/auth/Login';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { Public } from '../../helpers/customDecorator/Public';
import { AbstractAuthManager } from '../../managers/Auth';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authManager: AbstractAuthManager) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: LoginRequestDTO) {
    const result = await this.authManager.signIn(signInDto.email, signInDto.password);
    if(result.isLeft()){
      throw new BadRequestException(result.value.message)
    }
    return result.value;
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}