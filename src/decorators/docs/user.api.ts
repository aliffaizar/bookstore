import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function GetUsersApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get all users' }),
    ApiNotFoundResponse({ description: 'No users found' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function GetUserApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get a user' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CreateUserApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'User created successfully' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdateUserApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'User updated successfully' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteUserApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'User deleted successfully' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
