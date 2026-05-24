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
import { FoodNutrition } from '../../food-nutrition/entities/food-nutrition.entity';

@Entity('meal_plans')
export class MealPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'recipe_id', type: 'uuid', nullable: true })
  recipeId: string | null;

  @ManyToOne(() => Recipe, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe | null;

  @Column({ name: 'food_nutrition_id', type: 'uuid', nullable: true })
  foodNutritionId: string | null;

  @ManyToOne(() => FoodNutrition, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'food_nutrition_id' })
  foodNutrition: FoodNutrition | null;

  @Column({
    type: 'numeric',
    precision: 6,
    scale: 2,
    default: 1,
  })
  servings: number;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ name: 'meal_type', type: 'varchar' })
  mealType: string;

  @Column({ name: 'snapshot_recipe_name', type: 'jsonb', nullable: true })
  snapshotRecipeName: any | null;

  @Column({ name: 'snapshot_json_data', type: 'jsonb', nullable: true })
  snapshotJsonData: Record<string, any> | null;

  @Column({ name: 'snapshot_image_url', type: 'text', nullable: true })
  snapshotImageUrl: string | null;

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
