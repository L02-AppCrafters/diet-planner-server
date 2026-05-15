import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FoodNutritionService } from './food-nutrition.service';

@ApiTags('food-nutrition')
@Controller('food-nutrition')
export class FoodNutritionController {
  constructor(private readonly foodNutritionService: FoodNutritionService) {}

  @Get()
  @ApiOperation({ summary: 'Search food nutrition data (public)' })
  @ApiQuery({ name: 'search', required: false, example: 'chicken' })
  @ApiQuery({ name: 'category', required: false, example: 'Protein' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Paginated nutrition data' })
  async search(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.foodNutritionService.search(search, category, +page, +limit);
  }
}
