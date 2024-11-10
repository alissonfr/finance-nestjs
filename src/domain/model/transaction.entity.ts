import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionCategory } from './transaction-category.entity';
import { Account } from './account.entity';
import { User } from './user.entity';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId?: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column('decimal')
  amount: string;

  @ManyToOne(() => TransactionCategory, (category) => category.transactions)
  category: TransactionCategory;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

}