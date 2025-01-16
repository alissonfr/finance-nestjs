import { Category } from "src/modules/category/entities/category.entity"
import { PaymentMethod } from "src/modules/payment-method/entities/payment-method.entity"
import { Operation } from "src/shared/enum/operation.enum"
import { TransactionStatus } from "src/shared/enum/transaction-status.enum"
import { TransactionType } from "src/shared/enum/transaction-type.enum"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BankAccount } from "./bank-account.entity"

@Entity("bank_account_transaction")
export class BankAccountTransaction {
    @PrimaryGeneratedColumn({ name: "bank_account_transaction_id" })
    bankAccountTransactionId: number

    @Column()
    description: string

    @Column({ name: "fin_transaction_id" })
    finTransactionId: string

    @Column()
    notes: string

    @Column()
    date: Date

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    amount: number

    @Column({
        type: "enum",
        enum: TransactionStatus,
        default: TransactionStatus.PENDING,
    })
    status: TransactionStatus

    @Column({ type: "enum", enum: Operation })
    operation: Operation

    @Column({ type: "enum", enum: TransactionType })
    type: TransactionType

    @ManyToOne(() => Category, category => category.transactions)
    @JoinColumn({ name: "category_id" })
    category: Category

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.transactions)
    @JoinColumn({ name: "bank_account_id" })
    bankAccount: BankAccount

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.transactions)
    @JoinColumn({ name: "payment_method_id" })
    paymentMethod: PaymentMethod
}
