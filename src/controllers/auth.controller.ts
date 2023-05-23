import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import {
  LoginDto,
  RegisterDto,
  ResendVerifiCationDto,
} from 'src/dto/authentication.dto';
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

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return await this.authService.verifyUser(token);
  }

  @Post('verify-email/resend')
  @Throttle(1, 60)
  async resendVerificationEmail(@Body() { email }: ResendVerifiCationDto) {
    await this.authService.resendVerificationEmail(email);
    return { message: 'Verification email sent.' };
  }

  @Post('forgot-password')
  @Throttle(1, 60)
  async forgotPassword(@Body() { email }: ResendVerifiCationDto) {
    await this.authService.forgotPassword(email);
    return { message: 'Password reset email sent.' };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() { password }: { password: string },
  ) {
    await this.authService.resetPassword(token, password);
    return { message: 'Password reset successfully.' };
  }
}
