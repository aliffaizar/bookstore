import { Query, Resolver } from '@nestjs/graphql';

import { Order } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  orders(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
