import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Recipe JSON data (ingredients, steps, etc.)',
    example: { ingredients: ['chicken', 'rice'], steps: ['boil', 'fry'], calories: 500 },
  })
  @IsObject()
  @IsNotEmpty()
  jsonData: Record<string, any>;

  @ApiProperty({ example: 'https://example.com/recipe.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    description: 'Recipe name (string or object)',
    example: 'Grilled Chicken',
  })
  @IsNotEmpty()
  recipeName: any;
}
