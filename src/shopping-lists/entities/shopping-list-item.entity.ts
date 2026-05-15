import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShoppingList } from './shopping-list.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity('shopping_list_items')
export class ShoppingListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'shopping_list_id', type: 'uuid' })
  shoppingListId: string;

  @ManyToOne(() => ShoppingList, (list) => list.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shopping_list_id' })
  shoppingList: ShoppingList;

  @Column({ type: 'varchar' })
  ingredient: string;

  @Column({ type: 'varchar', nullable: true })
  quantity: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string;

  @Column({ name: 'is_purchased', type: 'boolean', default: false })
  isPurchased: boolean;

  @Column({ name: 'recipe_id', type: 'uuid', nullable: true })
  recipeId: string;

  @ManyToOne(() => Recipe, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
