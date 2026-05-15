import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateShoppingListItemDto {
  @ApiProperty({ example: 'Chicken breast' })
  @IsString()
  @IsNotEmpty()
  ingredient: string;

  @ApiPropertyOptional({ example: '200g' })
  @IsString()
  @IsOptional()
  quantity?: string;

  @ApiPropertyOptional({ example: '🍗' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID('4')
  @IsOptional()
  recipeId?: string;
}
