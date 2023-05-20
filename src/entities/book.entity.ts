import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.entity';
import { Category } from './category.entity';
import { Publisher } from './publisher.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'year' })
  publishedYear: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  publisher: Publisher;

  @ManyToOne(() => Author, (author) => author.books, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  author: Author;

  @ManyToOne(() => Category, (category) => category.books, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderItems: OrderItem[];
}
