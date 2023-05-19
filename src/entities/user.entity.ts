import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserRoleType = 'admin' | 'superadmin' | 'user';

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
  })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ['admin', 'superadmin', 'user'],
    default: 'user',
  })
  role: UserRoleType;
}
