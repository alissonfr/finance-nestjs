import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionCategory } from './transaction-category.entity';
import { BankAccount } from 'src/modules/bank-account/bank-account.entity';
import { User } from 'src/modules/user/entities/user.entity';

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

  @ManyToOne(() => BankAccount, (account) => account.transactions)
  bankAccount: BankAccount;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

}