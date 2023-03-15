import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  portfolioId: number;
}
