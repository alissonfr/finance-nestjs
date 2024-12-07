import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity('bank_account')
export class BankAccount {
  @PrimaryGeneratedColumn()
  bankAccountId?: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', name: "initial_amount" })
  initialAmount: string;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}