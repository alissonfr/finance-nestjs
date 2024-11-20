import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionCategory } from './transaction-category.entity';
import { Account } from './account.entity';
import { User } from './user.entity';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  transactionId?: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column('decimal')
  amount: string;

  @ManyToOne(() => TransactionCategory, (category) => category.transactions)
  @JoinColumn({ name: 'transaction_category_id' })
  category: TransactionCategory;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

}