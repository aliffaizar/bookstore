import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  pages: number;

  @IsNumber()
  price: number;

  @IsNumber()
  publishedYear: number;

  @IsString()
  image: string;

  @IsNumber()
  authorId: number;

  @IsNumber()
  publisherId: number;

  @IsNumber()
  categoryId: number;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
