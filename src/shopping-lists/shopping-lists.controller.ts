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
import { ShoppingListsService } from './shopping-lists.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { AddRecipeItemsDto } from './dto/add-recipe-items.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';

@ApiTags('shopping-lists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(private readonly shoppingListsService: ShoppingListsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a shopping list' })
  @ApiResponse({ status: 201, description: 'Shopping list created' })
  async create(@CurrentUser() user: User, @Body() dto: CreateShoppingListDto) {
    return this.shoppingListsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shopping lists for current user' })
  @ApiResponse({ status: 200, description: 'List of shopping lists' })
  async findAll(@CurrentUser() user: User) {
    return this.shoppingListsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shopping list by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Shopping list with items' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.shoppingListsService.findOne(id, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a shopping list' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.shoppingListsService.remove(id, user.id);
  }

  @Post(':id/items/from-recipe')
  @ApiOperation({ summary: 'Bulk-add ingredients from a recipe to a shopping list' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 201, description: 'Items added' })
  @ApiResponse({ status: 404, description: 'List or recipe not found' })
  async addItemsFromRecipe(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: AddRecipeItemsDto,
  ) {
    return this.shoppingListsService.addItemsFromRecipe(id, user.id, dto.recipeId);
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Add a manual item to a shopping list' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 201, description: 'Item added' })
  async addItem(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: CreateShoppingListItemDto,
  ) {
    return this.shoppingListsService.addItem(id, user.id, dto);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Update a shopping list item (e.g. toggle purchased)' })
  @ApiParam({ name: 'itemId', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Item updated' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async updateItem(
    @CurrentUser() user: User,
    @Param('itemId', new ParseUUIDPipe({ version: '4' })) itemId: string,
    @Body() dto: UpdateShoppingListItemDto,
  ) {
    return this.shoppingListsService.updateItem(itemId, user.id, dto);
  }

  @Delete('items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a shopping list item' })
  @ApiParam({ name: 'itemId', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async removeItem(
    @CurrentUser() user: User,
    @Param('itemId', new ParseUUIDPipe({ version: '4' })) itemId: string,
  ) {
    await this.shoppingListsService.removeItem(itemId, user.id);
  }
}
