import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import {
  ForgotPasswordApi,
  LoginApi,
  RegisterApi,
  ResendVerificationEmailApi,
  ResetPasswordApi,
  VerifyEmailApi,
} from 'src/decorators/docs/auth.api';

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

  @LoginApi()
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @RegisterApi()
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }

  @VerifyEmailApi()
  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return await this.authService.verifyUser(token);
  }

  @ResendVerificationEmailApi()
  @Post('verify-email/resend')
  @Throttle(1, 60)
  async resendVerificationEmail(@Body() { email }: ResendVerifiCationDto) {
    await this.authService.resendVerificationEmail(email);
    return { message: 'Verification email sent.' };
  }

  @ForgotPasswordApi()
  @Post('forgot-password')
  @Throttle(1, 60)
  async forgotPassword(@Body() { email }: ResendVerifiCationDto) {
    await this.authService.forgotPassword(email);
    return { message: 'Password reset email sent.' };
  }

  @ResetPasswordApi()
  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() { password }: { password: string },
  ) {
    await this.authService.resetPassword(token, password);
    return { message: 'Password reset successfully.' };
  }
}
