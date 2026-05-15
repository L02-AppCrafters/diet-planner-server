import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async toggle(uid: string, recipeId: string): Promise<{ isFavorited: boolean }> {
    const existing = await this.favoriteRepository.findOne({
      where: { uid, recipeId },
    });
    if (existing) {
      await this.favoriteRepository.delete(existing.id);
      return { isFavorited: false };
    }
    await this.favoriteRepository.save(
      this.favoriteRepository.create({ uid, recipeId }),
    );
    return { isFavorited: true };
  }

  async findAll(uid: string): Promise<Favorite[]> {
    return this.favoriteRepository.find({ where: { uid } });
  }
}
