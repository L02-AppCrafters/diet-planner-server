import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  picture?: string;

  @ApiPropertyOptional({ example: 'sub_1234567890' })
  @IsOptional()
  @IsString()
  subscriptionId?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  credit?: number;

  @ApiPropertyOptional({ example: '175' })
  @IsOptional()
  @IsString()
  height?: string;

  @ApiPropertyOptional({ example: '70' })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiPropertyOptional({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'lose_weight' })
  @IsOptional()
  @IsString()
  goal?: string;

  @ApiPropertyOptional({ example: 2000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  calories?: number;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsInt()
  @Min(0)
  proteins?: number;
}
