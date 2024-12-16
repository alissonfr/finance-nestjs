import { PaymentMethod } from 'src/shared/entities/payment-method.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { CreditCardBill } from 'src/modules/credit-card/entities/credit-card-bill.entity';
import { Operation } from 'src/shared/enum/operation.enum';
import { TransactionType } from 'src/shared/enum/transaction-type.enum';

@Entity('bank_account_transaction')
export class BankAccountTransaction {
  @PrimaryGeneratedColumn({ name: "bank_account_transaction_id" })
  bankAccountTransactionId: number;

  @Column()
  description: string;

  @Column()
  notes: string;

  @Column()
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, }) 
  amount: number;

  @Column({ type: 'enum', enum: Operation })
  operation: Operation;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => BankAccount, bankAccount => bankAccount.transactions)
  @JoinColumn({ name: "bank_account_id" })
  bankAccount: BankAccount;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.transactions)
  @JoinColumn({ name: "payment_method_id" })
  paymentMethod: PaymentMethod;

  @OneToMany(() => CreditCardBill, bill => bill.bankAccountTransaction)
  creditCardBills: CreditCardBill[];
}