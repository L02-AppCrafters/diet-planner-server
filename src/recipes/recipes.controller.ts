import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@ApiTags('recipes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiResponse({ status: 201, description: 'Recipe created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreateRecipeDto,
  ): Promise<Recipe> {
    return this.recipesService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all recipes for current user' })
  @ApiResponse({ status: 200, description: 'List of recipes' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@CurrentUser() user: User): Promise<Recipe[]> {
    return this.recipesService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a recipe by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Recipe found' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Recipe> {
    return this.recipesService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recipe by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Recipe updated' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipesService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a recipe by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Recipe deleted' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.recipesService.remove(id, user.id);
  }
}
