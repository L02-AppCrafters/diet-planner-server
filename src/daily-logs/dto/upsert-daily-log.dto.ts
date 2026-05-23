import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpsertDailyLogDto {
  @ApiProperty({ example: '2026-05-15' })
  @IsDateString()
  @IsNotEmpty()
  logDate: string;

  @ApiPropertyOptional({ example: 1800 })
  @IsInt()
  @Min(0)
  @IsOptional()
  calories?: number;

  @ApiPropertyOptional({ example: 120 })
  @IsInt()
  @Min(0)
  @IsOptional()
  proteins?: number;

  @ApiPropertyOptional({ example: 200 })
  @IsInt()
  @Min(0)
  @IsOptional()
  carbs?: number;

  @ApiPropertyOptional({ example: 60 })
  @IsInt()
  @Min(0)
  @IsOptional()
  fats?: number;

  @ApiPropertyOptional({ example: 2000 })
  @IsInt()
  @Min(0)
  @IsOptional()
  waterMl?: number;

  @ApiPropertyOptional({ example: 70.5, description: 'Current weight in kg' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  currentWeight?: number;

  @ApiPropertyOptional({ example: 'Felt good today' })
  @IsString()
  @IsOptional()
  notes?: string;
}
