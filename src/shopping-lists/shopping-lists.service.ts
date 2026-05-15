import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingList } from './entities/shopping-list.entity';
import { ShoppingListItem } from './entities/shopping-list-item.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';

@Injectable()
export class ShoppingListsService {
  constructor(
    @InjectRepository(ShoppingList)
    private readonly listRepository: Repository<ShoppingList>,
    @InjectRepository(ShoppingListItem)
    private readonly itemRepository: Repository<ShoppingListItem>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(uid: string, dto: CreateShoppingListDto): Promise<ShoppingList> {
    const list = this.listRepository.create({ uid, name: dto.name ?? 'Shopping List' });
    return this.listRepository.save(list);
  }

  async findAll(uid: string): Promise<ShoppingList[]> {
    return this.listRepository.find({ where: { uid }, relations: ['items'] });
  }

  async findOne(id: string, uid: string): Promise<ShoppingList> {
    const list = await this.listRepository.findOne({
      where: { id, uid },
      relations: ['items'],
    });
    if (!list) throw new NotFoundException('Shopping list not found');
    return list;
  }

  async remove(id: string, uid: string): Promise<void> {
    await this.findOne(id, uid);
    await this.listRepository.delete(id);
  }

  async addItemsFromRecipe(
    listId: string,
    uid: string,
    recipeId: string,
  ): Promise<ShoppingListItem[]> {
    await this.findOne(listId, uid);
    const recipe = await this.recipeRepository.findOne({ where: { id: recipeId, uid } });
    if (!recipe) throw new NotFoundException('Recipe not found');

    const ingredients: Array<{ ingredient: string; quantity?: string; icon?: string }> =
      recipe.jsonData?.ingredients ?? [];

    const items = ingredients.map((ing) =>
      this.itemRepository.create({
        shoppingListId: listId,
        ingredient: ing.ingredient,
        quantity: ing.quantity,
        icon: ing.icon,
        recipeId,
      }),
    );
    return this.itemRepository.save(items);
  }

  async addItem(
    listId: string,
    uid: string,
    dto: CreateShoppingListItemDto,
  ): Promise<ShoppingListItem> {
    await this.findOne(listId, uid);
    const item = this.itemRepository.create({ shoppingListId: listId, ...dto });
    return this.itemRepository.save(item);
  }

  async updateItem(
    itemId: string,
    uid: string,
    dto: UpdateShoppingListItemDto,
  ): Promise<ShoppingListItem> {
    const item = await this.itemRepository
      .createQueryBuilder('item')
      .innerJoin('item.shoppingList', 'list', 'list.uid = :uid', { uid })
      .where('item.id = :itemId', { itemId })
      .getOne();
    if (!item) throw new NotFoundException('Shopping list item not found');
    Object.assign(item, dto);
    return this.itemRepository.save(item);
  }

  async removeItem(itemId: string, uid: string): Promise<void> {
    const item = await this.itemRepository
      .createQueryBuilder('item')
      .innerJoin('item.shoppingList', 'list', 'list.uid = :uid', { uid })
      .where('item.id = :itemId', { itemId })
      .getOne();
    if (!item) throw new NotFoundException('Shopping list item not found');
    await this.itemRepository.delete(itemId);
  }
}
