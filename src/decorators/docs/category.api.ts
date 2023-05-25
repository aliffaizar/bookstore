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

export function GetCategoriesApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get all categories' }),
    ApiNotFoundResponse({ description: 'No categories found' }),
  );
}

export function GetCategoryApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get a category' }),
    ApiNotFoundResponse({ description: 'Category not found' }),
  );
}

export function CreateCategoryApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Category created successfully' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function UpdateCategoryApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Category updated successfully' }),
    ApiNotFoundResponse({ description: 'Category not found' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function DeleteCategoryApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Category deleted successfully' }),
    ApiNotFoundResponse({ description: 'Category not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}
