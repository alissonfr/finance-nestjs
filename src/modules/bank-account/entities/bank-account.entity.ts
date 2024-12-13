import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BankAccountTransaction } from './bank-account-transaction.entity';

@Entity('bank_account')
export class BankAccount {
  @PrimaryGeneratedColumn({ name: "bank_account_id" })
  bankAccountId?: number;

  @Column()
  name: string;

  @Column({ name: "initial_amount", type: 'decimal', precision: 10, scale: 2, default: 0, }) 
  initialAmount: number;

  @ManyToOne(() => User, user => user.bankAccounts)
  @JoinColumn({ name: "user_id" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => BankAccountTransaction, transaction => transaction.bankAccount)
  transactions: BankAccountTransaction[];
}