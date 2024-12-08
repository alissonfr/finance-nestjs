import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('bank_account')
export class BankAccount {
  @PrimaryGeneratedColumn()
  bankAccountId?: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', name: "initial_amount" })
  initialAmount: string;

  @OneToMany(() => Transaction, (transaction) => transaction.bankAccount)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}