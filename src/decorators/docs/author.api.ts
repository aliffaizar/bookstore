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

export function GetAuthorsApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Authors retrieved successfully' }),
    ApiNotFoundResponse({ description: 'No authors found' }),
  );
}

export function GetAuthorApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Author retrieved successfully' }),
    ApiNotFoundResponse({ description: 'Author not found' }),
  );
}

export function CreateAuthorApi() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiCreatedResponse({ description: 'Author created successfully' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdateAuthorApi() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiOkResponse({ description: 'Author updated successfully' }),
    ApiNotFoundResponse({ description: 'Author not found' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteAuthorApi() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
    ApiOkResponse({ description: 'Author deleted successfully' }),
    ApiNotFoundResponse({ description: 'Author not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
