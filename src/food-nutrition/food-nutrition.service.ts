import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FoodNutrition } from './entities/food-nutrition.entity';

@Injectable()
export class FoodNutritionService {
  constructor(
    @InjectRepository(FoodNutrition)
    private readonly foodRepository: Repository<FoodNutrition>,
  ) {}

  async search(
    query?: string,
    category?: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: FoodNutrition[]; total: number; page: number; limit: number }> {
    const where: Record<string, any> = {};
    if (query) where.name = ILike(`%${query}%`);
    if (category) where.category = category;

    const [data, total] = await this.foodRepository.findAndCount({
      where,
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }
}
