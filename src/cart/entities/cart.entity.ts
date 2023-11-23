import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userID: string;

  @Column({ name: 'product_id' })
  productID: string;

  @Column({ type: 'integer' })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (bakery) => bakery.cart)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;
}
