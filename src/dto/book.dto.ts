import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'The Lord of the Rings', required: true })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({ example: 'The Lord of the Rings', required: true })
  @IsString()
  description: string;

  @ApiProperty({ example: 1000, required: true })
  @IsNumber()
  pages: number;

  @ApiProperty({ example: 19.99, required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 2000, required: true })
  @IsNumber()
  publishedYear: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: true })
  @IsString()
  image: string;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  authorId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  publisherId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  categoryId: number;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ example: 'The Lord of the Rings', required: false })
  title: string;

  @ApiProperty({ example: 'The Lord of the Rings', required: false })
  description: string;

  @ApiProperty({ example: 1000, required: false })
  pages: number;

  @ApiProperty({ example: 19.99, required: false })
  price: number;

  @ApiProperty({ example: 2000, required: false })
  publishedYear: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  image: string;

  @ApiProperty({ example: 1, required: false })
  authorId: number;

  @ApiProperty({ example: 1, required: false })
  publisherId: number;
}
