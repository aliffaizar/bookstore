import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from '../types/user.type';
import { Order } from './order.entity';
import { VerifyEmail } from './verify-email.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: ['admin', 'superadmin', 'user'],
    default: 'user',
  })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => VerifyEmail, (verifyEmail) => verifyEmail.user)
  verifyEmails: VerifyEmail[];
}
