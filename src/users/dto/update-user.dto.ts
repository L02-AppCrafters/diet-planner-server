import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

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

  @ApiPropertyOptional({
    example: 'lose_weight',
    enum: ['lose_weight', 'gain_muscle', 'healthy_lifestyle'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['lose_weight', 'gain_muscle', 'healthy_lifestyle'])
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

  @ApiPropertyOptional({ example: 28 })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['sedentary', 'light', 'active', 'elite'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['sedentary', 'light', 'active', 'elite'])
  activityLevel?: string;

  @ApiPropertyOptional({ example: 200 })
  @IsOptional()
  @IsInt()
  @Min(0)
  carbsGoal?: number;

  @ApiPropertyOptional({ example: 60 })
  @IsOptional()
  @IsInt()
  @Min(0)
  fatsGoal?: number;
}
