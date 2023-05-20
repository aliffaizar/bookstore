import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/order.dto';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const { orderItems, ...orderData } = orderDto;
    const order = await this.orderRepository.save(orderData);
    const orderItemsToCreate = orderItems.map((orderItem) => ({
      ...orderItem,
      orderId: order.id,
    }));
    const createdOrderItems = await this.orderItemRepository.save(
      orderItemsToCreate,
    );
    return { ...order, orderItems: createdOrderItems };
  }
}
