import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ShoppingListItem } from './shopping-list-item.entity';

@Entity('shopping_lists')
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'uid', type: 'uuid' })
  uid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column({ type: 'varchar', default: 'Shopping List' })
  name: string;

  @OneToMany(() => ShoppingListItem, (item) => item.shoppingList, {
    cascade: true,
  })
  items: ShoppingListItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
