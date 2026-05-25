import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly configService: ConfigService,
  ) {}

  async create(uid: string, dto: CreateRecipeDto): Promise<Recipe> {
    const normalizedImageUrl = await this.normalizeImageUrl(dto.imageUrl);
    const recipe = this.recipeRepository.create({ ...dto, imageUrl: normalizedImageUrl, isDefault: false, uid });
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
    const normalizedImageUrl = dto.imageUrl ? await this.normalizeImageUrl(dto.imageUrl) : recipe.imageUrl;
    Object.assign(recipe, { ...dto, imageUrl: normalizedImageUrl });
    return this.recipeRepository.save(recipe);
  }

  async remove(id: string, uid: string): Promise<void> {
    const recipe = await this.recipeRepository.findOne({ where: { id, uid } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    await this.recipeRepository.delete(id);
  }

  private async normalizeImageUrl(imageUrl: string) {
    if (!imageUrl.startsWith('data:image/')) {
      return imageUrl;
    }

    const match = imageUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) {
      return imageUrl;
    }

    const mimeType = match[1];
    const base64Payload = match[2];
    const extension = mimeType.includes('png') ? 'png' : 'jpg';
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const uploadDir = join(process.cwd(), 'public', 'recipes', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, fileName), Buffer.from(base64Payload, 'base64'));

    const publicBaseUrl =
      this.configService.get<string>('PUBLIC_BASE_URL') ??
      this.configService.get<string>('HEALTH_CHECK_URL')?.replace(/\/health\/?$/, '') ??
      'http://localhost:4000';

    return `${publicBaseUrl.replace(/\/$/, '')}/recipes/uploads/${fileName}`;
  }
}
