import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserRole } from 'src/types/user.type';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe@mail.com', required: true })
  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ example: 'password', required: true })
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin', required: false })
  @IsOptional()
  @IsString()
  @IsEnum(['admin', 'superadmin', 'user'])
  role: UserRole;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
