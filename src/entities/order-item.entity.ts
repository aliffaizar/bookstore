import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { Order } from './order.entity';
import { Book } from './book.entity';

@Entity()
@ObjectType()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;

  @ManyToOne(() => Book, (book) => book.orderItems, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Book)
  book: Book;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Order)
  order: Order;
}
