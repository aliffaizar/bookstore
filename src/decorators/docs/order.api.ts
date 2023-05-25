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

export function GetOrdersApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get all orders' }),
    ApiNotFoundResponse({ description: 'No orders found' }),
  );
}

export function GetOrderApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Get a order' }),
    ApiNotFoundResponse({ description: 'Order not found' }),
  );
}

export function CreateOrderApi() {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Order created successfully' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function UpdateOrderApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Order updated successfully' }),
    ApiNotFoundResponse({ description: 'Order not found' }),
    ApiBadRequestResponse({ description: 'Invalid input or missing values' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}

export function DeleteOrderApi() {
  return applyDecorators(
    ApiOkResponse({ description: 'Order deleted successfully' }),
    ApiNotFoundResponse({ description: 'Order not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', description: 'Bearer <token>' }),
  );
}
