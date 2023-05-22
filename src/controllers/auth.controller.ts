import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginDto, RegisterDto } from 'src/dto/authentication.dto';
import { AuthService } from 'src/services/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }
}
