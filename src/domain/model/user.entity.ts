import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from './account.entity';
import { TransactionCategory } from './transaction-category.entity';
import { Transaction } from './transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true})
  email: string;

  @Column({ nullable: false, unique: true})
  cpf: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => TransactionCategory, (category) => category.user)
  categories: TransactionCategory[];
}