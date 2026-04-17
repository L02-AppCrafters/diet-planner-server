import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity('meal_plans')
export class MealPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'recipe_id', type: 'uuid' })
  recipeId: string;

  @ManyToOne(() => Recipe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ name: 'meal_type', type: 'varchar' })
  mealType: string;

  @Column({ name: 'uid', type: 'uuid' })
  uid: string;

  @ManyToOne(() => User, 'mealPlans', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
