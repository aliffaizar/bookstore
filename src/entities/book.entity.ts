import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Author } from './author.entity';
import { Category } from './category.entity';
import { Publisher } from './publisher.entity';
import { OrderItem } from './order-item.entity';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  pages: number;

  @Field(() => Int)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Field(() => Int)
  @Column({ type: 'year' })
  publishedYear: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Field(() => Publisher)
  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  publisher: Publisher;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author: Author;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.books, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderItems: OrderItem[];
}
