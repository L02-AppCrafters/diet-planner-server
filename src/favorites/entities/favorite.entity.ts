import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity('favorite_recipes')
@Unique(['uid', 'recipeId'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'uid', type: 'uuid' })
  uid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column({ name: 'recipe_id', type: 'uuid' })
  recipeId: string;

  @ManyToOne(() => Recipe, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
