import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Book } from './book.entity';

@Entity()
@ObjectType()
export class Publisher {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @Field()
  name: string;

  @OneToMany(() => Book, (book) => book.publisher)
  @Field(() => [Book])
  books: Book[];
}
