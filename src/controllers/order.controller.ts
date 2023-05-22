import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders() {
    return await this.orderService.findAll();
  }

  @Post()
  async createOrder(@Body() orderDto: CreateOrderDto) {
    return await this.orderService.createOrder(orderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: number, @Body() orderDto: UpdateOrderDto) {
    return await this.orderService.update(id, orderDto);
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: number) {
    return await this.orderService.remove(id);
  }
}
