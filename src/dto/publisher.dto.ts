import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PublisherDto {
  @ApiProperty({ example: 'Penguin Random House', required: true })
  @IsString()
  name: string;
}
