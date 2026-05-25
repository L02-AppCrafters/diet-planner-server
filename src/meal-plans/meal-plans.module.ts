import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlan } from './entities/meal-plan.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { MealPlansService } from './meal-plans.service';
import { MealPlansController } from './meal-plans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MealPlan, Recipe])],
  controllers: [MealPlansController],
  providers: [MealPlansService],
})
export class MealPlansModule {}
