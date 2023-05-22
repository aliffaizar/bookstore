import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'Author name',
    example: 'Dan Brown',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Author biography',
    example: 'this is a short biography of the author ',
    required: true,
  })
  @IsString()
  biography: string;
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
