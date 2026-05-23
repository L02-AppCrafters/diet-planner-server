import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateMealPlanDto {
  @ApiPropertyOptional({
    description:
      'UUID of the recipe. Either recipeId OR foodNutritionId must be provided, not both.',
    example: 'uuid-v4',
  })
  @ValidateIf((o) => !o.foodNutritionId)
  @IsUUID()
  @IsOptional()
  recipeId?: string;

  @ApiPropertyOptional({
    description:
      'UUID of a food-nutrition entry (for raw foods). Either recipeId OR foodNutritionId must be provided, not both.',
    example: 'uuid-v4',
  })
  @ValidateIf((o) => !o.recipeId)
  @IsUUID()
  @IsOptional()
  foodNutritionId?: string;

  @ApiPropertyOptional({
    description: 'Number of servings (default 1).',
    example: 1.5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  servings?: number;

  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2026-04-17',
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date: string;

  @ApiProperty({
    description: 'Type of meal',
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    example: 'breakfast',
  })
  @IsString()
  @IsIn(['breakfast', 'lunch', 'dinner', 'snack'])
  mealType: string;
}
