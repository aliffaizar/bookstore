import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 19.99, required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  bookId: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 19.99, required: true })
  @IsNumber()
  total: number;

  @ApiProperty({
    example: [{ bookId: 1, quantity: 1, price: 19.99 }],
    required: true,
  })
  @IsArray()
  orderItems: OrderItemDto[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
