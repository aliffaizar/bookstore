import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { Order } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service';

@SkipThrottle()
@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  orders(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
