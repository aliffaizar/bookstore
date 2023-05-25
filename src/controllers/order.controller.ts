import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateOrderApi,
  DeleteOrderApi,
  GetOrderApi,
  GetOrdersApi,
  UpdateOrderApi,
} from 'src/decorators/docs/order.api';
import { Roles } from 'src/decorators/roles.decorator';

import { CreateOrderDto, UpdateOrderDto } from 'src/dto/order.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { OrderService } from 'src/services/order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GetOrdersApi()
  @Get()
  async getOrders() {
    return await this.orderService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin', 'user')
  @CreateOrderApi()
  @Post()
  async createOrder(@Body() orderDto: CreateOrderDto) {
    return await this.orderService.createOrder(orderDto);
  }

  @GetOrderApi()
  @Get(':id')
  async getOrder(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin', 'user')
  @UpdateOrderApi()
  @Patch(':id')
  async updateOrder(@Param('id') id: number, @Body() orderDto: UpdateOrderDto) {
    return await this.orderService.update(id, orderDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @DeleteOrderApi()
  @Delete(':id')
  async removeOrder(@Param('id') id: number) {
    return await this.orderService.remove(id);
  }
}
