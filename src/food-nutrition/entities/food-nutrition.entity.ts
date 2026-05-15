import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('food_nutrition')
export class FoodNutrition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'serving_size', type: 'varchar', default: '100g' })
  servingSize: string;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  calories: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  proteins: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  carbohydrates: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  fats: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  fiber: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  sugar: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  sodium: number;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
