import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { OrderController } from 'src/controllers/order.controller';
import { OrderService } from 'src/services/order.service';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Book])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
