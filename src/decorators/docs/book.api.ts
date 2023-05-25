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

export function GetBooksApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get all books' }),
    ApiNotFoundResponse({ description: 'No books found' }),
  );
}

export function GetBookApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get a book' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
  );
}

export function CreateBookApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Book created successfully' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function UpdateBookApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Book updated successfully' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function DeleteBookApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Book deleted successfully' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}
