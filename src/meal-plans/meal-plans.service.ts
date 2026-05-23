import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealPlan } from './entities/meal-plan.entity';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';

@Injectable()
export class MealPlansService {
  constructor(
    @InjectRepository(MealPlan)
    private readonly mealPlanRepository: Repository<MealPlan>,
  ) {}

  async create(uid: string, dto: CreateMealPlanDto): Promise<MealPlan> {
    const hasRecipe = !!dto.recipeId;
    const hasFood = !!dto.foodNutritionId;
    if (hasRecipe === hasFood) {
      throw new BadRequestException(
        'Provide exactly one of recipeId or foodNutritionId',
      );
    }
    const mealPlan = this.mealPlanRepository.create({ ...dto, uid });
    return this.mealPlanRepository.save(mealPlan);
  }

  async findAll(uid: string, date?: string): Promise<MealPlan[]> {
    return this.mealPlanRepository.find({
      where: { uid, ...(date && { date }) },
      relations: ['recipe', 'foodNutrition'],
    });
  }

  async findOne(id: string, uid: string): Promise<MealPlan> {
    const mealPlan = await this.mealPlanRepository.findOne({
      where: { id, uid },
      relations: ['recipe', 'foodNutrition'],
    });
    if (!mealPlan) throw new NotFoundException('Meal plan not found');
    return mealPlan;
  }

  async update(id: string, uid: string, dto: UpdateMealPlanDto): Promise<MealPlan> {
    const mealPlan = await this.findOne(id, uid);
    Object.assign(mealPlan, dto);
    return this.mealPlanRepository.save(mealPlan);
  }

  async remove(id: string, uid: string): Promise<void> {
    await this.findOne(id, uid);
    await this.mealPlanRepository.delete(id);
  }
}
