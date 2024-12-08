import { BankAccount } from 'src/modules/bank-account/bank-account.entity';
import { TransactionCategory } from 'src/modules/transaction/entities/transaction-category.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => BankAccount, (account) => account.user)
  accounts: BankAccount[];

  @OneToMany(() => TransactionCategory, (category) => category.user)
  categories: TransactionCategory[];
}