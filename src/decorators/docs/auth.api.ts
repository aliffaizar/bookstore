import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function RegisterApi() {
  return applyDecorators(
    ApiConflictResponse({ description: 'Email already exists' }),
    ApiCreatedResponse({ description: 'User created successfully' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required values',
    }),
  );
}

export function LoginApi() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Invalid input or missing required values',
    }),
    ApiCreatedResponse({ description: 'User logged in successfully' }),
    ApiUnauthorizedResponse({
      description: 'Invalid credentials or user unverified',
    }),
  );
}

export function VerifyEmailApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'User verified' }),
    ApiUnauthorizedResponse({
      description: 'Invalid token or token expired',
    }),
    ApiConflictResponse({ description: 'User already verified' }),
    ApiTooManyRequestsResponse({
      description: 'Too many requests, only one request per 60 seconds',
    }),
  );
}

export function ResendVerificationEmailApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Verification email sent' }),
    ApiConflictResponse({ description: 'User already verified' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing email' }),
  );
}

export function ForgotPasswordApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Password reset email sent' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing email' }),
    ApiTooManyRequestsResponse({
      description: 'Too many requests, only  one request per 60 seconds',
    }),
  );
}

export function ResetPasswordApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Password reset successfully' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required values',
    }),
    ApiUnauthorizedResponse({
      description: 'Invalid token or token expired',
    }),
  );
}
