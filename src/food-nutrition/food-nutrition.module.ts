import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodNutrition } from './entities/food-nutrition.entity';
import { FoodNutritionService } from './food-nutrition.service';
import { FoodNutritionController } from './food-nutrition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FoodNutrition])],
  controllers: [FoodNutritionController],
  providers: [FoodNutritionService],
})
export class FoodNutritionModule {}
