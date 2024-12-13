import { BankAccountTransaction } from "src/modules/bank-account/entities/bank-account-transaction.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('payment_method')
export class PaymentMethod {
    @PrimaryGeneratedColumn({ name: "payment_method_id" })
    paymentMethodId: number;

    @Column()
    name: string;

    @OneToMany(() => BankAccountTransaction, transaction => transaction.paymentMethod)
    transactions: BankAccountTransaction[];
}