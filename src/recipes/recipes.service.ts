import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(uid: string, dto: CreateRecipeDto): Promise<Recipe> {
    const recipe = this.recipeRepository.create({ ...dto, isDefault: false, uid });
    return this.recipeRepository.save(recipe);
  }

  async findAll(uid: string): Promise<Recipe[]> {
    return this.recipeRepository.find({
      order: {
        isDefault: 'DESC',
        createdAt: 'DESC',
      },
      where: [
        { isDefault: true },
        { uid },
      ],
    });
  }

  async findOne(id: string, uid: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: [
        { id, isDefault: true },
        { id, uid },
      ],
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async update(id: string, uid: string, dto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id, uid } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    Object.assign(recipe, dto);
    return this.recipeRepository.save(recipe);
  }

  async remove(id: string, uid: string): Promise<void> {
    const recipe = await this.recipeRepository.findOne({ where: { id, uid } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    await this.recipeRepository.delete(id);
  }
}
