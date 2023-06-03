import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Book } from './book.entity';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Field()
  name: string;

  @Column({ type: 'text' })
  @Field()
  biography: string;

  @OneToMany(() => Book, (book) => book.author)
  @Field(() => [Book])
  books: Book[];
}
