import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class EnvirionmentVariable {
  @IsOptional()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  MYSQL_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  MYSQL_PORT: number;

  @IsNotEmpty()
  @IsString()
  MYSQL_USER: string;

  @IsNotEmpty()
  @IsString()
  MYSQL_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  MYSQL_DATABASE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvirionmentVariable, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync({ skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
