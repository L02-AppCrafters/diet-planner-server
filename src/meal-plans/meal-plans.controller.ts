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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { MealPlansService } from './meal-plans.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { MealPlan } from './entities/meal-plan.entity';

@ApiTags('meal-plans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('meal-plans')
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meal plan entry' })
  @ApiResponse({ status: 201, description: 'Meal plan created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreateMealPlanDto,
  ): Promise<MealPlan> {
    return this.mealPlansService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meal plans for current user' })
  @ApiQuery({ name: 'date', required: false, description: 'Filter by date (YYYY-MM-DD)', example: '2026-04-17' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Range start date (YYYY-MM-DD)', example: '2026-04-14' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Range end date (YYYY-MM-DD)', example: '2026-04-20' })
  @ApiResponse({ status: 200, description: 'List of meal plans' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @CurrentUser() user: User,
    @Query('date') date?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<MealPlan[]> {
    return this.mealPlansService.findAll(user.id, date, startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meal plan by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Meal plan found' })
  @ApiResponse({ status: 404, description: 'Meal plan not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<MealPlan> {
    return this.mealPlansService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a meal plan by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Meal plan updated' })
  @ApiResponse({ status: 404, description: 'Meal plan not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateMealPlanDto,
  ): Promise<MealPlan> {
    return this.mealPlansService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a meal plan by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Meal plan deleted' })
  @ApiResponse({ status: 404, description: 'Meal plan not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(
    @CurrentUser() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.mealPlansService.remove(id, user.id);
  }
}
