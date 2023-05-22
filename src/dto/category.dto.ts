import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: 'Fiction', required: true })
  @IsString()
  name: string;
}
