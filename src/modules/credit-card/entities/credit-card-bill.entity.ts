import { BankAccountTransaction } from 'src/modules/bank-account/entities/bank-account-transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CreditCard } from './credit-card.entity';
import { CreditCardTransaction } from './credit-card-transaction.entity';

@Entity("credit_card_bill")
export class CreditCardBill {
    @PrimaryGeneratedColumn({ name: "credit_card_bill_id" })
    creditCardBillId: number;

    @Column({ name: "due_date" })
    dueDate: Date;

    @Column()
    paid: boolean;

    @ManyToOne(() => CreditCard, creditCard => creditCard.bills)
    @JoinColumn({ name: "credit_card_id" })
    creditCard: CreditCard;

    @ManyToOne(() => BankAccountTransaction, transaction => transaction.creditCardBills)
    @JoinColumn({ name: "bank_account_transaction_id" })
    bankAccountTransaction: BankAccountTransaction;

    @OneToMany(() => CreditCardTransaction, transaction => transaction.creditCardBill)
    transactions: CreditCardTransaction[];
}