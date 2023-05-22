import { User } from 'src/entities/user.entity';

export type UserRole = 'admin' | 'superadmin' | 'user';
export type UserWithToken = User & { token: string };
