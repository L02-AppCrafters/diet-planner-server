import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'refresh_token', nullable: true, type: 'text' })
  refreshToken: string | null;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  picture: string | null;

  @Column({ name: 'subscription_id', type: 'varchar', nullable: true })
  subscriptionId: string | null;

  @Column({ type: 'int', default: 0 })
  credit: number;

  @Column({ type: 'varchar', nullable: true })
  height: string | null;

  @Column({ type: 'varchar', nullable: true })
  weight: string | null;

  @Column({ type: 'varchar', nullable: true })
  gender: string | null;

  @Column({ type: 'varchar', nullable: true })
  goal: string | null;

  @Column({ type: 'int', nullable: true })
  calories: number | null;

  @Column({ type: 'int', nullable: true })
  proteins: number | null;

  @Column({ type: 'int', nullable: true })
  age: number | null;

  @Column({ name: 'activity_level', type: 'varchar', nullable: true })
  activityLevel: string | null;

  @Column({ name: 'carbs_goal', type: 'int', nullable: true })
  carbsGoal: number | null;

  @Column({ name: 'fats_goal', type: 'int', nullable: true })
  fatsGoal: number | null;

  @OneToMany('Recipe', 'user')
  recipes: any[];

  @OneToMany('MealPlan', 'user')
  mealPlans: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
