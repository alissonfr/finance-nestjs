import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity('transaction_category')
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  transactionCategoryId?: number;

  @Column()
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
