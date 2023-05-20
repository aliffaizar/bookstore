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
