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

export function GetPublisherApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get a publisher' }),
    ApiNotFoundResponse({ description: 'Publisher not found' }),
  );
}

export function GetPublishersApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get all publishers' }),
    ApiNotFoundResponse({ description: 'No publishers found' }),
  );
}

export function CreatePublisherApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Publisher created successfully' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function UpdatePublisherApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Publisher updated successfully' }),
    ApiNotFoundResponse({ description: 'Publisher not found' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function DeletePublisherApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Publisher deleted successfully' }),
    ApiNotFoundResponse({ description: 'Publisher not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}
