import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Toggle favorite status of a recipe' })
  @ApiResponse({ status: 201, description: 'Toggle result' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async toggle(
    @CurrentUser() user: User,
    @Body() dto: CreateFavoriteDto,
  ): Promise<{ isFavorited: boolean }> {
    return this.favoritesService.toggle(user.id, dto.recipeId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorited recipes for current user' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@CurrentUser() user: User): Promise<Favorite[]> {
    return this.favoritesService.findAll(user.id);
  }
}
