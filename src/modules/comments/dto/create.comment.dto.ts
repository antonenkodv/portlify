import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  text: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  imageId: number;
}
