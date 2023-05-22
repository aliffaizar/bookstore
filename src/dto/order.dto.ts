import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNumber } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  bookId: number;
}

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  total: number;

  @IsArray()
  orderItems: OrderItemDto[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
