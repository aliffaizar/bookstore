import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserRole } from 'src/types/user.type';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @IsEnum(['admin', 'superadmin', 'user'])
  role: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
