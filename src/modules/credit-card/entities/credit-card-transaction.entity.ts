import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CreditCardBill } from "./credit-card-bill.entity";
import { TransactionType } from "src/shared/enum/transaction-type.enum";

@Entity("credit_card_transaction")
export class CreditCardTransaction {
    @PrimaryGeneratedColumn({ name: "credit_card_transaction_id" })
    creditCardTransactionId: number;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    notes: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, }) 
    amount: number;
    
    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @ManyToOne(() => CreditCardBill, bill => bill.transactions)
    @JoinColumn({ name: "credit_card_bill_id" })
    creditCardBill: CreditCardBill;
}