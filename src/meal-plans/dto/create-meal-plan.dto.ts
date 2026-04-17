import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, IsUUID, Matches } from 'class-validator';

export class CreateMealPlanDto {
  @ApiProperty({ description: 'UUID of the recipe', example: 'uuid-v4' })
  @IsUUID()
  recipeId: string;

  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2026-04-17',
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in YYYY-MM-DD format' })
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
