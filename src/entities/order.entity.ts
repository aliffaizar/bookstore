import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field()
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  orderDate: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @Field(() => [OrderItem])
  orderItems: OrderItem[];
}
