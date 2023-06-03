import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from '../types/user.type';
import { Order } from './order.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

enum Role {
  admin = 'admin',
  superadmin = 'superadmin',
  user = 'user',
}

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ nullable: false, default: false })
  @Field(() => Boolean)
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: ['admin', 'superadmin', 'user'],
    default: 'user',
  })
  @Field()
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order])
  orders: Order[];
}
