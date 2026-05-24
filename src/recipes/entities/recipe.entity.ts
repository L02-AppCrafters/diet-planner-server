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

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  jsonData: Record<string, any>;

  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;

  @Column({ name: 'recipe_name', type: 'jsonb' })
  recipeName: any;

  @Column({ name: 'uid', type: 'uuid', nullable: true })
  uid: string | null;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault: boolean;

  @ManyToOne(() => User, 'recipes', { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
