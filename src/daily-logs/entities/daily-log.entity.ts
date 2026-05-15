import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('daily_logs')
@Unique(['uid', 'logDate'])
export class DailyLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'uid', type: 'uuid' })
  uid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column({ name: 'log_date', type: 'date' })
  logDate: string;

  @Column({ type: 'int', default: 0 })
  calories: number;

  @Column({ type: 'int', default: 0 })
  proteins: number;

  @Column({ type: 'int', default: 0 })
  carbs: number;

  @Column({ type: 'int', default: 0 })
  fats: number;

  @Column({ name: 'water_ml', type: 'int', default: 0 })
  waterMl: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
