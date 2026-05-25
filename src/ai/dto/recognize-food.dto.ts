import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RecognizeFoodDto {
  @IsString()
  @MaxLength(10_000_000)
  imageBase64!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  prompt?: string;
}

