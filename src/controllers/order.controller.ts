import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { CreateOrderDto, UpdateOrderDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders() {
    return await this.orderService.findAll();
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Post()
  async createOrder(@Body() orderDto: CreateOrderDto) {
    return await this.orderService.createOrder(orderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Patch(':id')
  async updateOrder(@Param('id') id: number, @Body() orderDto: UpdateOrderDto) {
    return await this.orderService.update(id, orderDto);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Delete(':id')
  async removeOrder(@Param('id') id: number) {
    return await this.orderService.remove(id);
  }
}
